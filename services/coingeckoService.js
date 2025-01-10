const axios = require("axios");

const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3/simple/price";

async function fetchCryptoData(coinIds) {
  try {
    const response = await axios.get(COINGECKO_BASE_URL, {
      params: {
        ids: coinIds.join(","), 
        vs_currencies: "usd", 
        include_market_cap: true,
        include_24hr_change: true,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data from CoinGecko:", error.message);
    throw new Error("Failed to fetch data from CoinGecko.");
  }
}

module.exports = { fetchCryptoData };
