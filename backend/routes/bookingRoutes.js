// backend/routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Experience = require("../models/Experience");
const Booking = require("../models/Booking");
const Promo = require("../models/Promo");

// POST /bookings
router.post("/", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      experienceId,
      date,       // string like '2025-11-01'
      time,       // string like '08:00 AM'
      seats = 1,  // number
      name,
      email,
      phone,
      promoCode
    } = req.body;

    if (!experienceId || !date || !time || !name || !email) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: "Missing required fields" });
    }

    // load experience with session
    const exp = await Experience.findById(experienceId).session(session);
    if (!exp) throw new Error("Experience not found");

    // find the correct slot by date+time
    const slot = exp.slots.find(s => s.date === date && s.time === time);
    if (!slot) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: "Slot not found for selected date/time" });
    }

    if ((slot.bookedSeats || 0) + seats > (slot.totalSeats || 0)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({ error: "Not enough seats available" });
    }

    // reserve seats
    slot.bookedSeats = (slot.bookedSeats || 0) + seats;
    await exp.save({ session });

    // pricing calculation (server-side authoritative)
    const subtotal = exp.price * seats;
    const serviceFee = Math.round(subtotal * 0.05);
    const taxes = Math.round(subtotal * 0.18);
    let discount = 0;

    if (promoCode) {
      const promo = await Promo.findOne({ code: promoCode.toUpperCase() }).session(session);
      if (promo) {
        discount = promo.type === "PERCENT" ? Math.round((subtotal * promo.value) / 100) : promo.value;
      }
    }

    const amountPaid = subtotal + serviceFee + taxes - discount;

    const booking = new Booking({
      experienceId,
      experienceTitle: exp.title,
      date,
      time,
      seats,
      name,
      email,
      phone,
      promoCode,
      amountPaid,
      status: "CONFIRMED"
    });

    await booking.save({ session });

    await session.commitTransaction();
    session.endSession();

    // return booking summary to frontend
    return res.json({
      success: true,
      bookingId: booking._id,
      experienceTitle: exp.title,
      date,
      time,
      seats,
      amountPaid
    });
  } catch (err) {
    console.error("Booking error:", err);
    try {
      await session.abortTransaction();
      session.endSession();
    } catch (e) {}
    return res.status(500).json({ error: err.message || "Server error" });
  }
});

module.exports = router;
