// backend/models/Booking.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  experienceId: { type: Schema.Types.ObjectId, ref: "Experience", required: true },
  experienceTitle: { type: String },
  date: { type: String, required: true }, // ISO date or readable string
  time: { type: String, required: true },
  seats: { type: Number, required: true, default: 1 },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  promoCode: { type: String },
  amountPaid: { type: Number, required: true },
  status: { type: String, default: "CONFIRMED" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", BookingSchema);
