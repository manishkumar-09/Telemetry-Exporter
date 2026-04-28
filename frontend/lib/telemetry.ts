"use client";

export interface FormValues {
  imei: string;
  serialNumber: string;
  totalEnergy: string;
  totalWaterDischarge: string;
  totalRunHours: string;
  hp: string;
  deviceType: string;
  fromDate: string;
  toDate: string;
  dataCount: string;
}

export interface FormErrors {
  hp?: string;
  deviceType?: string;
  fromDate?: string;
  toDate?: string;
  dataCount?: string;
}

export type TelemetryRecord = {
  VD?: string | number;
  TIMESTAMP?: string | number;
  MAXINDEX?: string | number;
  INDEX?: string | number;
  LOAD?: string | number;
  STINTERVAL?: string | number;
  MSGID?: string | number;
  DATE?: string | number;
  IMEI?: string | number;
  ASN_11?: string | number;
  POTP?: string | number;
  COTP?: string | number;
  PRUNST1?: string | number;
  POPFREQ1?: string | number;
  POPI1?: string | number;
  POPV1?: string | number;
  POPKW1?: string | number;
  PDC1V1?: string | number;
  PDC1I1?: string | number;
  PREFFREQ1?: string | number;
  PDCVOC1?: string | number;
  PDKWH1?: string | number;
  PTOTKWH1?: string | number;
  POPFLW1?: string | number;
  POPDWD1?: string | number;
  POPTOTWD1?: string | number;
  PMAXFREQ1?: string | number;
  PFREQLSP1?: string | number;
  PFREQHSP1?: string | number;
  PCNTRMODE1?: string | number;
  PMAXDCV1?: string | number;
  PMAXDCI1?: string | number;
  PMAXKW1?: string | number;
  PMAXFLW1?: string | number;
  PDHR1?: string | number;
  PTOTHR1?: string | number;
  CLAT?: string | number;
  CLONG?: string | number;
  CMAINVER?: string | number;
  CNXVER?: string | number;
  CRPM?: string | number;
  CFLTBIT?: string | number;
  SINVTEMP?: string | number;
  CHSTEMP?: string | number;
  CSIGSTR?: string | number;
  REMARK?: string | number;
  [key: string]: unknown;
};

export const API_ENDPOINT = "http://localhost:4000/api/telemetry/generate";
export const API_DISPLAY_ENDPOINT = "localhost:4000/api/telemetry/generate";

export const INITIAL_FORM_VALUES: FormValues = {
  imei: "",
  serialNumber: "",
  totalEnergy: "",
  totalWaterDischarge: "",
  totalRunHours: "",
  hp: "",
  deviceType: "",
  fromDate: "",
  toDate: "",
  dataCount: "",
};

export const HP_OPTIONS = [
  { label: "3 HP", value: "3" },
  { label: "5 HP", value: "5" },
  { label: "7.5 HP", value: "7.5" },
  { label: "10 HP", value: "10" },
];

export const DEVICE_OPTIONS = [
  { label: "AC Surface", value: "AC Surface" },
  { label: "DC Surface", value: "DC Surface" },
  { label: "AC Submersible", value: "AC Submersible" },
  { label: "DC Submersible", value: "DC Submersible" },
];

export const TELEMETRY_COLUMNS: {
  key: keyof TelemetryRecord;
  label: string;
  category: string;
  mono?: boolean;
}[] = [
  { key: "VD", label: "VD", category: "meta" },
  { key: "TIMESTAMP", label: "Timestamp", category: "meta" },
  { key: "MAXINDEX", label: "Max Index", category: "meta", mono: true },
  { key: "INDEX", label: "Index", category: "meta", mono: true },
  { key: "LOAD", label: "Load", category: "meta" },
  { key: "STINTERVAL", label: "St. Interval", category: "meta" },
  { key: "MSGID", label: "Msg ID", category: "meta", mono: true },
  { key: "DATE", label: "Date", category: "meta" },
  { key: "IMEI", label: "IMEI", category: "meta", mono: true },
  { key: "ASN_11", label: "ASN 11", category: "meta" },
  { key: "POTP", label: "POTP", category: "pump" },
  { key: "COTP", label: "COTP", category: "pump" },
  { key: "PRUNST1", label: "Run Status", category: "pump" },
  { key: "POPFREQ1", label: "Op Freq (Hz)", category: "pump", mono: true },
  { key: "POPI1", label: "Op Current (A)", category: "pump", mono: true },
  { key: "POPV1", label: "Op Voltage (V)", category: "pump", mono: true },
  { key: "POPKW1", label: "Op Power (kW)", category: "pump", mono: true },
  { key: "PDC1V1", label: "DC Voltage 1", category: "dc", mono: true },
  { key: "PDC1I1", label: "DC Current 1", category: "dc", mono: true },
  { key: "PREFFREQ1", label: "Ref Freq (Hz)", category: "pump", mono: true },
  { key: "PDCVOC1", label: "DC VOC", category: "dc", mono: true },
  { key: "PDKWH1", label: "Daily kWh", category: "energy", mono: true },
  { key: "PTOTKWH1", label: "Total kWh", category: "energy", mono: true },
  { key: "POPFLW1", label: "Flow Rate", category: "pump", mono: true },
  { key: "POPDWD1", label: "Daily Water (L)", category: "pump", mono: true },
  { key: "POPTOTWD1", label: "Total Water (L)", category: "pump", mono: true },
  { key: "PMAXFREQ1", label: "Max Freq (Hz)", category: "pump", mono: true },
  { key: "PFREQLSP1", label: "Freq LSP", category: "pump", mono: true },
  { key: "PFREQHSP1", label: "Freq HSP", category: "pump", mono: true },
  { key: "PCNTRMODE1", label: "Control Mode", category: "pump" },
  { key: "PMAXDCV1", label: "Max DC V", category: "dc", mono: true },
  { key: "PMAXDCI1", label: "Max DC I", category: "dc", mono: true },
  { key: "PMAXKW1", label: "Max kW", category: "energy", mono: true },
  { key: "PMAXFLW1", label: "Max Flow", category: "pump", mono: true },
  { key: "PDHR1", label: "Daily Hours", category: "pump", mono: true },
  { key: "PTOTHR1", label: "Total Hours", category: "pump", mono: true },
  // { key: "CLAT", label: "Latitude", category: "location", mono: true },
  // { key: "CLONG", label: "Longitude", category: "location", mono: true },
  // { key: "CMAINVER", label: "Main Ver", category: "device" },
  // { key: "CNXVER", label: "NX Ver", category: "device" },
  // { key: "CRPM", label: "RPM", category: "pump", mono: true },
  // { key: "CFLTBIT", label: "Fault Bit", category: "status", mono: true },
  // { key: "SINVTEMP", label: "Inv Temp (C)", category: "temp", mono: true },
  // { key: "CHSTEMP", label: "HS Temp (C)", category: "temp", mono: true },
  // { key: "CSIGSTR", label: "Signal Str", category: "device", mono: true },
  // { key: "REMARK", label: "Remark", category: "meta" },
];

export const FIELD_REFERENCE_ITEMS = [
  { key: "VD", desc: "Version descriptor or data version" },
  { key: "TIMESTAMP", desc: "Record timestamp" },
  { key: "MAXINDEX", desc: "Maximum index in current dataset batch" },
  { key: "INDEX", desc: "Current record index" },
  { key: "LOAD", desc: "System load or operational load status" },
  { key: "STINTERVAL", desc: "Sampling or status interval duration" },
  { key: "MSGID", desc: "Message identifier for the record" },
  { key: "DATE", desc: "Record date" },
  { key: "IMEI", desc: "Device IMEI" },
  { key: "ASN_11", desc: "Analog sensor reading or auxiliary signal" },

  { key: "POTP", desc: "Pump total power parameter" },
  { key: "COTP", desc: "Controller output power parameter" },
  { key: "PRUNST1", desc: "Pump run status (on/off)" },
  { key: "POPFREQ1", desc: "Operating frequency of pump" },
  { key: "POPI1", desc: "Operating current of pump" },
  { key: "POPV1", desc: "Operating voltage of pump" },
  { key: "POPKW1", desc: "Operating power of pump in kilowatts" },

  { key: "PDC1V1", desc: "DC input voltage (channel 1)" },
  { key: "PDC1I1", desc: "DC input current (channel 1)" },
  { key: "PREFFREQ1", desc: "Reference frequency setpoint" },
  { key: "PDCVOC1", desc: "DC open circuit voltage" },

  { key: "PDKWH1", desc: "Daily energy generated (kWh)" },
  { key: "PTOTKWH1", desc: "Total accumulated energy (kWh)" },

  { key: "POPFLW1", desc: "Pump flow rate" },
  { key: "POPDWD1", desc: "Daily water discharge" },
  { key: "POPTOTWD1", desc: "Total water discharged" },

  { key: "PMAXFREQ1", desc: "Maximum frequency reached" },
  { key: "PFREQLSP1", desc: "Frequency lower setpoint" },
  { key: "PFREQHSP1", desc: "Frequency higher setpoint" },
  { key: "PCNTRMODE1", desc: "Controller operating mode" },

  { key: "PMAXDCV1", desc: "Maximum DC voltage recorded" },
  { key: "PMAXDCI1", desc: "Maximum DC current recorded" },
  { key: "PMAXKW1", desc: "Maximum power recorded in kW" },
  { key: "PMAXFLW1", desc: "Maximum flow rate recorded" },

  { key: "PDHR1", desc: "Daily runtime hours" },
  { key: "PTOTHR1", desc: "Total accumulated runtime hours" },

  { key: "CLAT", desc: "GPS latitude coordinate" },
  { key: "CLONG", desc: "GPS longitude coordinate" },

  { key: "CMAINVER", desc: "Main firmware version" },
  { key: "CNXVER", desc: "NX firmware version" },

  { key: "CRPM", desc: "Motor speed in RPM" },
  { key: "CFLTBIT", desc: "Fault bitmask indicating system errors" },

  { key: "SINVTEMP", desc: "Inverter temperature" },
  { key: "CHSTEMP", desc: "Heatsink temperature" },

  { key: "CSIGSTR", desc: "Signal strength of communication module" },
  { key: "REMARK", desc: "Additional remarks or notes" },
];
const CSV_FIELDS = TELEMETRY_COLUMNS.map((column) => column.key);

export async function fetchTelemetryData(
  values: FormValues,
): Promise<TelemetryRecord[]> {
  const isDateRange =
    values.fromDate && values.toDate && values.fromDate !== values.toDate;

  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify({
      imei: values.imei,
      hp: values.hp,
      deviceType: values.deviceType,
      fromDate: values.fromDate,
      toDate: values.toDate,
      ...(isDateRange ? {} : { dataCount: Number(values.dataCount) }),
      serialNumber: values.serialNumber || "",
      totalEnergy: values.totalEnergy || "",
      totalRunHours: values.totalRunHours || "",
      totalWaterDischarge: values.totalWaterDischarge || "",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(`API returned ${response.status}: ${errorText}`);
  }

  const data = await response.json();

  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  if (data && Array.isArray(data.records)) return data.records;
  if (data && Array.isArray(data.result)) return data.result;

  throw new Error(
    "Unexpected API response format: expected an array of records",
  );
}

export function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.hp) {
    errors.hp = "HP rating is required";
  }

  // if (!values.deviceType) {
  //   errors.deviceType = "Device type is required";
  // }

  if (!values.fromDate) {
    errors.fromDate = "Start date is required";
  }

  if (values.toDate && values.fromDate && values.fromDate > values.toDate) {
    errors.toDate = "End date must be on or after start date";
  }

  const requiresDataCount = !values.toDate || values.fromDate === values.toDate;

  if (requiresDataCount) {
    const count = Number(values.dataCount);

    if (!values.dataCount) {
      errors.dataCount = "Record count is required for same-day data";
    } else if (!Number.isFinite(count) || count <= 0) {
      errors.dataCount = "Record count must be greater than 0";
    } else if (count > 100000) {
      errors.dataCount = "Maximum 100,000 records per request";
    }
  }

  return errors;
}

export function exportToCSV(data: TelemetryRecord[], filename: string) {
  const presentFields = CSV_FIELDS.filter((field) =>
    data.some((row) => row[field] !== undefined && row[field] !== null),
  );

  const headers = ["#", ...presentFields];
  const rows = data.map((row, index) => [
    index + 1,
    ...presentFields.map((field) => {
      const value = row[field];
      if (value === null || value === undefined) return "";

      const cell = String(value).replace(/"/g, '""');
      return /[",\n]/.test(cell) ? `"${cell}"` : cell;
    }),
  ]);

  const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

import * as XLSX from "xlsx";

export function exportToExcel(
  data: any[],
  filename: string,
  columnMap: Record<string, string>,
) {
  if (!data || data.length === 0) return;

  const fields = Object.keys(columnMap);

  // Single header row (ONLY keys)
  const header = fields;

  // Data rows (no index column)
  const rows = data.map((row) => fields.map((field) => row[field] ?? ""));

  const sheetData = [header, ...rows];

  // Create worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

  // Column width = 20 (as you wanted earlier)
  worksheet["!cols"] = fields.map(() => ({ wch: 18 }));

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Telemetry");

  // Download
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}
