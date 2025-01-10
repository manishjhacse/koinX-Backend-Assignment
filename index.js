const express = require("express");
const cron = require("node-cron");
const fetchCryptoJob = require("./jobs/fetchCryptoJob");
const statsRouter = require("./routes/stats");
const deviationRouter = require("./routes/deviation");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
require("./config/connectDB").connectDB();
app.use(express.json());
app.use("/stats", statsRouter);
app.use("/deviation", deviationRouter);

cron.schedule("0 */2 * * *", fetchCryptoJob);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

fetchCryptoJob();
