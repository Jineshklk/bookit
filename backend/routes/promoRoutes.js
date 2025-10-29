const express = require("express");
const router = express.Router();
const Promo = require("../models/Promo");

// POST /promo/validate
router.post("/validate", async (req, res) => {
  try {
    const { code, cartAmount } = req.body;
    if (!code) return res.status(400).json({ valid: false, message: "No code provided" });

    const promo = await Promo.findOne({ code: code.toUpperCase() }).lean();
    if (!promo) return res.json({ valid: false, message: "Invalid code" });

    if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) {
      return res.json({ valid: false, message: "Promo expired" });
    }
    if (promo.minSpend && cartAmount < promo.minSpend) {
      return res.json({ valid: false, message: `Minimum spend ${promo.minSpend}` });
    }

    let discount = 0;
    if (promo.type === "PERCENT") discount = Math.round((cartAmount * promo.value) / 100);
    else discount = promo.value;

    res.json({ valid: true, code: promo.code, type: promo.type, value: promo.value, discount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
