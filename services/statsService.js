function calculateStandardDeviation(prices) {
  const n = prices.length;
  if (n === 0) return 0;

  const mean = prices.reduce((acc, val) => acc + val, 0) / n;
  const variance =
    prices.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;

  return Math.sqrt(variance);
}

module.exports = { calculateStandardDeviation };
