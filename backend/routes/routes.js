const { Router } = require("express");
const TelemetryGenerator = require("../controller/dataGenerator");

const router = Router();

router.post("/api/telemetry/generate", TelemetryGenerator);

module.exports = router;
