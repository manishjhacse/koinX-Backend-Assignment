const express = require("express");
const Crypto = require("../models/Crypto");
const { calculateStandardDeviation } = require("../services/statsService");
const router = express.Router();

router.get("/", async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: "Missing 'coin' query parameter." });
  }

  try {
    const records = await Crypto.find({ coin }).sort({ createdAt: -1 }).limit(100);

    if (!records || records.length === 0) {
      return res.status(404).json({ error: `No records found for coin: ${coin}` });
    }

    const prices = records.map((record) => record.price);
    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation: parseFloat(deviation.toFixed(2)) });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
