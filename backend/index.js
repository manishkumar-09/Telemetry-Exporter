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

app.get("/", (req, res) => {
  res.send("HOME");
});

// app.post("/generate", (req, res) => {
//   try {
//     const {
//       imei,
//       serialNumber,
//       totalEnergy,
//       totalRunHours,
//       totalWaterDischarge,
//       hp,
//       fromDate,
//       toDate,
//       deviceType,
//       dataCount,
//     } = req.body;

//     const timestamps = generateTimestamps({
//       fromDate,
//       toDate,
//       count: Number(dataCount),
//     });

//     //  Initialize running values
//     let runningWater = parseFloat(totalWaterDischarge) || 0;
//     let runningEnergy = parseFloat(totalEnergy) || 0;
//     let runningHours = parseFloat(totalRunHours) || 0;
//     const records = timestamps.map((timeData) => {
//       const base = buildTelemetry({
//         imei,
//         serialNumber,
//         // totalEnergy,
//         // totalRunHours,
//         // totalWaterDischarge,
//         hp,
//         fromDate,
//         toDate,
//         dataCount,
//       });

//       const flow = parseFloat(base.POPFLW1) || 0;
//       const power = parseFloat(base.POPKW1) || 0;

//       // ─── WATER ─────────────────────────────
//       const intervalWater = getIntervalWater(flow); // 15 min interval

//       // ─── ENERGY ────────────────────────────
//       const intervalEnergy = generateTodayIntervalEnergy(power); // kWh

//       // ─── HOURS ─────────────────────────────
//       const intervalHours = generateDailyRunHours();

//       runningWater = updateTotalWater(intervalWater, runningWater, hp);
//       runningEnergy = updateTotalEnergy(intervalEnergy, runningEnergy);
//       runningHours = updateTotalRunHours(runningHours, intervalHours);

//       return {
//         ...base,

//         TIMESTAMP: timeData.TIMESTAMP,
//         DATE: timeData.DATE,

//         // WATER
//         POPDWD1: Number(intervalWater).toFixed(2),
//         POPTOTWD1: Number(runningWater).toFixed(3),

//         // ENERGY
//         PDKWH1: Number(intervalEnergy).toFixed(3),
//         PTOTKWH1: Number(runningEnergy).toFixed(3),
//         // HOURS
//         PDHR1: Number(intervalHours).toFixed(2),
//         PTOTHR1: Number(runningHours).toFixed(3),
//       };
//     });
//     res.status(201).json({
//       success: true,
//       count: records.length,
//       data: records,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// });

app.listen(PORT, () => console.log(`Server is listening at Port: ${PORT}`));

// const cluster = require("cluster");
// const os = require("os");
// const express = require("express");

// if (cluster.isPrimary) {
//   const cpuCount = os.cpus().length;
//   for (let i = 0; i < cpuCount; i++) {
//     cluster.fork();
//   }
// } else {
//   const app = express();
//   app.get("/", (req, res) => {
//     res.send(`Handled by process ${process.pid}`);
//   });

//   app.listen(3000);
// }
