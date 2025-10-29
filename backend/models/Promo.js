const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PromoSchema = new Schema({
  code: { type: String, unique: true },
  type: { type: String, enum: ["PERCENT", "FLAT"] },
  value: Number,
  minSpend: Number,
  expiresAt: Date
});

module.exports = mongoose.model("Promo", PromoSchema);
