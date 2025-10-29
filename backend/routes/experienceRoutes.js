// backend/routes/experienceRoutes.js
const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");

// GET /experiences?q=term
router.get("/", async (req, res) => {
  try {
    const q = (req.query.q || "").toString().trim();

    const filter = q
      ? {
          $or: [
            { title: { $regex: q, $options: "i" } },
            { location: { $regex: q, $options: "i" } },
            { description: { $regex: q, $options: "i" } },
            { slug: { $regex: q, $options: "i" } }
          ]
        }
      : {};

    const list = await Experience.find(filter).lean();
    // add availableSeats compute if you want
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /experiences/:id
router.get("/:id", async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id).lean();
    if (!exp) return res.status(404).json({ error: "Experience not found" });
    exp.slots = exp.slots.map((s) => ({
      _id: s._id,
      date: s.date,
      time: s.time,
      totalSeats: s.totalSeats,
      bookedSeats: s.bookedSeats,
      availableSeats: Math.max(0, (s.totalSeats || 0) - (s.bookedSeats || 0))
    }));
    res.json(exp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
