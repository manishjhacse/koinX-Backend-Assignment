const express = require("express");
const Crypto = require("../models/Crypto");
const router = express.Router();

router.get("/", async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: "Missing 'coin' query parameter." });
  }

  try {
    const latestData = await Crypto.findOne({ coin }).sort({ createdAt: -1 });
    if (!latestData) {
      return res.status(404).json({ error: `No data found for coin: ${coin}` });
    }

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
