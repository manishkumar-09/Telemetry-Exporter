const baseTelemetry = {
  VD: 1,
  TIMESTAMP: "",
  MAXINDEX: 96,
  INDEX: "",
  LOAD: 0,
  STINTERVAL: 15,
  MSGID: "",
  DATE: "",
  IMEI: "",
  ASN_11: "",
  POTP: "",
  COTP: "",
  PRUNST1: "1",
  POPFREQ1: "",
  POPI1: "",
  POPV1: "",
  POPKW1: "",
  PDC1V1: "",
  PDC1I1: "",
  PREFFREQ1: "",
  PDCVOC1: "",
  PDKWH1: "",
  PTOTKWH1: "",
  POPFLW1: "",
  POPDWD1: "",
  POPTOTWD1: "",
  PMAXFREQ1: "",
  PFREQLSP1: "",
  PFREQHSP1: "",
  PCNTRMODE1: "",
  PMAXDCV1: "",
  PMAXDCI1: "",
  PMAXKW1: "",
  PMAXFLW1: "",
  PDHR1: "",
  PTOTHR1: "",
  CLAT: "",
  CLONG: "",
  // CMAINVER: "",
  // CNXVER: "",
  // CRPM: "",
  // CFLTBIT: "",
  // SINVTEMP: "",
  // CHSTEMP: "",
  // CSIGSTR: "",
  // REMARK: "",
};

const telemetryVariants = {
  THREE_HP: {
    PREFFREQ1: "0.00",
    PDCVOC1: "350.00",
    PMAXFREQ1: "180.00",
    PFREQLSP1: "1.00",
    PFREQHSP1: "60.00",
    PCNTRMODE1: "2.00",
    PMAXDCV1: "350.00",
    PMAXDCI1: "16.00",
    PMAXKW1: "3000.00",
    PMAXFLW1: "0.00", // max flow by default
  },
  FIVE_HP: {
    PREFFREQ1: "0.00",
    PDCVOC1: "500.00",
    PMAXFREQ1: "180.00",
    PFREQLSP1: "1.00",
    PFREQHSP1: "60.00",
    PCNTRMODE1: "2.00",
    PMAXDCV1: "500.00",
    PMAXDCI1: "16.00",
    PMAXKW1: "4800.00",
    PMAXFLW1: "0.00",
  },
  SEVEN_FIVE_HP: {
    PREFFREQ1: "0.00",
    PDCVOC1: "750.00",
    PMAXFREQ1: "180.00",
    PFREQLSP1: "1.00",
    PFREQHSP1: "60.00",
    PCNTRMODE1: "2.00",
    PMAXDCV1: "750.00",
    PMAXDCI1: "16.00",
    PMAXKW1: "7500.00",
    PMAXFLW1: "0.00",
  },
  TEN_HP: {
    PREFFREQ1: "0.00",
    PDCVOC1: "900.00",
    PMAXFREQ1: "180.00",
    PFREQLSP1: "1.00",
    PFREQHSP1: "60.00",
    PCNTRMODE1: "1.00",
    PMAXDCV1: "900.00",
    PMAXDCI1: "16.00",
    PMAXKW1: "9600.00",
    PMAXFLW1: "0.00",
  },
};

//random range
function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

//timestamp dynamic
function generateTimestamps({ fromDate, toDate, count = 7 }) {
  const results = [];

  const pad = (n) => String(n).padStart(2, "0");

  function formatTimestamp(d) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  function formatDateField(d) {
    return `${pad(d.getFullYear() % 100)}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  }

  function randomDateTime(baseDate) {
    const d = new Date(baseDate);

    // random hour between 11–16
    const hour = 11 + Math.floor(Math.random() * 6);
    const minute = Math.floor(Math.random() * 60);
    const second = Math.floor(Math.random() * 60);

    d.setHours(hour, minute, second);

    return {
      TIMESTAMP: formatTimestamp(d),
      DATE: formatDateField(d),
    };
  }

  //   Only fromDate (same day, multiple records)
  if (!toDate) {
    const baseDate = new Date(fromDate);

    for (let i = 0; i < count; i++) {
      results.push(randomDateTime(baseDate));
    }
  }

  //  CASE 2: fromDate → toDate (one per day)
  else {
    let current = new Date(fromDate);
    const end = new Date(toDate);

    while (current <= end) {
      results.push(randomDateTime(current));
      current.setDate(current.getDate() + 1);
    }
  }

  return results;
}

// frequency
function generateSolarFrequency() {
  const r = Math.random();

  if (r < 0.3) {
    // Low sunlight
    return (40 + Math.random() * 15).toFixed(2); // 20–35 Hz
  } else if (r < 0.7) {
    // Normal
    return (45 + Math.random() * 15).toFixed(2); // 40–55 Hz
  } else {
    // High sunlight
    return (60 + Math.random() * 50).toFixed(2); // 60–110 Hz
  }
}
//current
function generateCurrent(freq, hp) {
  const hpBaseMap = {
    3: 3,
    5: 5,
    7.5: 8,
    10: 10,
  };

  const base = hpBaseMap[hp] || 5;

  // Normalize frequency (0 → 1.5 range roughly)
  const freqFactor = Math.min(freq / 60, 1.5);

  // Dynamic min & max based on hp + frequency
  let minCurrent = base * 0.4 * freqFactor;
  let maxCurrent = base * 1.2 * freqFactor;

  // Clamp within global limits
  minCurrent = Math.max(1, minCurrent);
  maxCurrent = Math.min(15, maxCurrent);

  // Ensure min < max
  if (minCurrent >= maxCurrent) {
    minCurrent = Math.max(1, maxCurrent - 0.5);
  }

  // Generate random current in range
  const current = minCurrent + Math.random() * (maxCurrent - minCurrent);

  return current.toFixed(2);
}
//voltage
function generateVoltage(freq, dcVoltage) {
  const freqFactor = Math.min(freq / 60, 1.2);

  // output voltage range (based on DC)
  let minVoltage = dcVoltage * 0.6 * freqFactor;
  let maxVoltage = dcVoltage * 0.9 * freqFactor;

  // safety bounds
  minVoltage = Math.max(100, minVoltage);
  maxVoltage = Math.min(dcVoltage * 0.95, maxVoltage); // 👈 important fix

  if (minVoltage >= maxVoltage) {
    minVoltage = Math.max(100, maxVoltage - 5);
  }

  const voltage = minVoltage + Math.random() * (maxVoltage - minVoltage);

  return voltage.toFixed(2);
}
// power

function calculatePower(voltage, current, hp) {
  const SQRT3 = 1.732;
  // const PF = 0.8;

  const hpValue = Number(hp);

  let power = (SQRT3 * voltage * current) / 1000;

  const maxPowerMap = {
    3: 3,
    5: 5,
    7.5: 7.5,
    10: 10,
  };

  const maxPower = maxPowerMap[hpValue] || 5;

  // soft cap
  if (power > maxPower) {
    power = maxPower * (0.5 + Math.random() * 0.1);
  }

  return power.toFixed(2);
}
//dc voltage

function generateDCVoltage(hp) {
  const rangeMap = {
    3: { min: 190, max: 325 },
    5: { min: 300, max: 500 },
    7.5: { min: 490, max: 620 },
    10: { min: 600, max: 700 },
  };

  const range = rangeMap[hp] || { min: 300, max: 500 };

  const voltage = range.min + Math.random() * (range.max - range.min);

  return voltage.toFixed(2);
}

//dc current
function generateDCCurrent(popVoltage, popCurrent, dcVoltage) {
  const efficiency = 0.9; // 90% typical VFD

  const acPower = popVoltage * popCurrent; // watts
  const dcPower = acPower / efficiency;

  let dcCurrent = dcPower / dcVoltage;

  // small solar fluctuation
  dcCurrent = dcCurrent * (0.95 + Math.random() * 0.1);

  return dcCurrent.toFixed(2);
}

// today energy
function generateTodayIntervalEnergy(powerKW) {
  const INTERVAL_HOURS = 15 / 60; // 0.25

  if (powerKW <= 0.1) return "0.01";

  // base energy
  let energy = powerKW * INTERVAL_HOURS;

  // add solar fluctuation (±10%)
  const variation = 0.3 + Math.random() * 0.1;

  // energy = energy * variation;
  energy = energy;

  return energy.toFixed(2);
}

// cumulative total energy
function updateTotalEnergy(intervalEnergy, previousTotalEnergy) {
  let total = parseFloat(previousTotalEnergy) || 0;

  let interval = parseFloat(intervalEnergy) || 0;
  let random = getRandomInRange(0.2, 0.9);

  interval += random;
  total += interval;

  return total;
}

// flow speed
function generateFlow(powerKW, hp) {
  const maxFlowMap = {
    3: 80,
    5: 120,
    7.5: 150,
    10: 160,
  };

  const maxPowerMap = {
    3: 3,
    5: 5,
    7.5: 7.5,
    10: 10,
  };

  const maxFlow = maxFlowMap[hp] || 80;
  const maxPower = maxPowerMap[hp] || 5;

  //  handle very low power
  if (powerKW < 0.2) {
    return (5 + Math.random() * 5).toFixed(2); // 5–10 LPM
  }

  let factor = powerKW / maxPower;
  factor = Math.min(Math.max(factor, 0), 1);

  // pump curve
  factor = Math.sqrt(factor);

  let flow = maxFlow * factor;

  // solar fluctuation
  flow = flow * (0.9 + Math.random() * 0.2);

  //  ensure never zero
  flow = Math.max(flow, 3);

  return flow.toFixed(2);
}

//today water discharge
function getIntervalWater(flowLPM) {
  const INTERVAL_MINUTES = 12;

  if (flowLPM <= 0) return 0;

  return flowLPM * INTERVAL_MINUTES;
}

// function calculateDailyWater(flowLPM, runHours) {
//   if (flowLPM <= 0 || runHours <= 0) return 0;

//   return flowLPM * runHours * 60;
// }

//total water discharge
function updateTotalWater(intervalWater, previousTotalWater, hp) {
  const rangeMap = {
    3: [500, 1000],
    5: [500, 1200],
    7.5: [500, 1500],
    10: [500, 2000],
  };

  const hpValue = Number(hp);
  const [min, max] = rangeMap[hpValue] || [500, 1500];

  //  ALWAYS add extra water
  const extraWater = getRandomInRange(min, max);

  const totalIntervalWater = intervalWater + extraWater;

  let total = parseFloat(previousTotalWater) || 0;
  total += totalIntervalWater;

  return total;
}

// daily run hours
function generateDailyRunHours() {
  const MIN_HOURS = 0.1;
  const MAX_HOURS = 0.9;

  const r = Math.random();
  let hours;

  if (r < 0.2) {
    // very low sunlight → 0.1–0.3
    hours = MIN_HOURS + Math.random() * 0.2;
  } else if (r < 0.7) {
    // normal → 0.3–0.7
    hours = 0.3 + Math.random() * 0.4;
  } else {
    // good sunlight → 0.7–0.9
    hours = 0.7 + Math.random() * 0.2;
  }

  // Clamp
  hours = Math.max(MIN_HOURS, Math.min(hours, MAX_HOURS));

  return hours.toFixed(2);
}

//Total run hours
function updateTotalRunHours(previousTotal, dailyRunHours) {
  let total = parseFloat(previousTotal) || 0;
  let extraHour = getRandomInRange(0.1, 0.5);
  total = total + extraHour;
  total += parseFloat(dailyRunHours) || 0;

  return total.toFixed(2);
}

function getIndex(timestamp) {
  const current = new Date(timestamp);

  const base = new Date(current);
  base.setHours(8, 0, 0, 0);

  const diff = current - base;

  let index = Math.floor(diff / (15 * 60 * 1000)) + 1;

  // enforce bounds (1 to 1440)
  index = Math.max(1, Math.min(index, 96));

  return index;
}

function buildTelemetry(data) {
  const {
    imei,
    serialNumber,
    totalEnergy,
    totalRunHours,
    totalWaterDischarge,
    hp,
    fromDate,
    toDate,
    dataCount,
  } = data;
  const [{ TIMESTAMP, DATE }] = generateTimestamps({
    fromDate,
    toDate,
    count: dataCount,
  });
  const freq = generateSolarFrequency();
  const current = generateCurrent(freq, hp);
  const dcVoltage = generateDCVoltage(hp);
  const voltage = generateVoltage(freq, dcVoltage);
  const power = calculatePower(voltage, current);
  const dcCurrent = generateDCCurrent(voltage, current, dcVoltage);
  const todayEnergy = generateTodayIntervalEnergy(power);
  // const cumulativeEnergy = updateTotalEnergy(power, totalEnergy);
  const flowLpm = generateFlow(power, hp);
  const todayWaterDischarge = getIntervalWater(flowLpm);
  // const TotalWaterDischarge = updateTotalWater(flowLpm, totalWaterDischarge);
  const DailyRunHours = generateDailyRunHours();
  // const TotalRunHours = updateTotalRunHours(totalRunHours, DailyRunHours);
  const Index = getIndex(TIMESTAMP);

  const hpMap = {
    3: "THREE_HP",
    5: "FIVE_HP",
    7.5: "SEVEN_FIVE_HP",
    10: "TEN_HP",
  };

  const variantKey = hpMap[hp];
  const variant = telemetryVariants[variantKey] || {};

  //  Build final telemetry object
  const telemetry = {
    ...baseTelemetry,

    //  variant must override base
    ...variant,

    // dynamic fields
    TIMESTAMP,
    DATE: Number(DATE),
    INDEX: Number(Index),

    // user inputs
    IMEI: imei || "",
    ASN_11: serialNumber || "",

    //output frequency
    POPFREQ1: freq,

    POPI1: current,
    POPV1: voltage,
    POPKW1: power,

    PDC1V1: dcVoltage,
    PDC1I1: dcCurrent,

    // PDKWH1: todayEnergy,
    // PTOTKWH1: cumulativeEnergy,

    POPFLW1: flowLpm,
    // POPDWD1: todayWaterDischarge.toFixed(2),
    // POPTOTWD1: TotalWaterDischarge || "0",

    // PDHR1: DailyRunHours,
    // PTOTHR1: TotalRunHours || "0.000",
  };

  return telemetry;
}

module.exports = {
  buildTelemetry,
  generateTimestamps,
  generateTodayIntervalEnergy,
  generateDailyRunHours,
  getIntervalWater,
  updateTotalWater,
  updateTotalEnergy,
  updateTotalRunHours,
};
