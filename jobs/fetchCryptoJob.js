const { fetchCryptoData } = require("../services/coingeckoService");
const Crypto = require("../models/Crypto");

const COINS = ["bitcoin", "matic-network", "ethereum"];

async function fetchAndStoreCryptoData() {
  try {
    const data = await fetchCryptoData(COINS);

    for (const coin of COINS) {
      const coinData = data[coin];
      if (coinData) {
        await Crypto.create({
          coin,
          price: coinData.usd,
          marketCap: coinData.usd_market_cap,
          change24h: coinData.usd_24h_change,
        });
      }
    }
    console.log("Crypto data fetched and stored successfully.");
  } catch (error) {
    console.error("Error fetching or storing crypto data:", error.message);
  }
}

module.exports = fetchAndStoreCryptoData;
