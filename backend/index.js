require("dotenv").config();
const cors = require("cors");
const express = require("express");

const {
  buildTelemetry,
  generateTimestamps,
  updateTotalWater,
  updateTotalEnergy,
  updateTotalRunHours,
  getIntervalWater,
  generateTodayIntervalEnergy,
  generateDailyRunHours,
} = require("./services/pump.service");
const router = require("./routes/routes");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(PORT, () => console.log(`Server is listening at Port: ${PORT}`));
