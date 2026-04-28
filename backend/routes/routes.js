const { Router } = require("express");
const TelemetryGenerator = require("../controller/dataGenerator");

const router = Router();

router.post("/telemetry/generate", TelemetryGenerator);

module.exports = router;
