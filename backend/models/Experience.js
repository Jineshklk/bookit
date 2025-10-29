const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlotSchema = new Schema({
  date: String,      // ISO date string or readable "2025-11-01"
  time: String,      // "10:00 AM"
  totalSeats: Number,
  bookedSeats: { type: Number, default: 0 }
});

const ExperienceSchema = new Schema({
  title: { type: String, required: true },
  slug: String,
  location: String,
  locationFull: String,
  description: String,
  price: Number, // per person
  duration: Number,
  imageUrl: String,
  slots: [SlotSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Experience", ExperienceSchema);
