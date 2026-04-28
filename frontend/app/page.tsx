"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "../components/DataTable";
import { FormCard } from "../components/FormCard";
import {
  API_DISPLAY_ENDPOINT,
  exportToCSV,
  exportToExcel,
  fetchTelemetryData,
  FIELD_REFERENCE_ITEMS,
  FormErrors,
  FormValues,
  INITIAL_FORM_VALUES,
  TELEMETRY_COLUMNS,
  TelemetryRecord,
  validateForm,
} from "@/lib/telemetry";

function StatCard({
  label,
  value,
  sub,
  color = "blue",
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  color?: "blue" | "emerald" | "amber" | "violet";
  icon?: React.ReactNode;
}) {
  const colors = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      icon: "text-blue-500",
      label: "text-blue-500",
    },
    emerald: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      icon: "text-emerald-500",
      label: "text-emerald-500",
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-700",
      icon: "text-amber-500",
      label: "text-amber-500",
    },
    violet: {
      bg: "bg-violet-50",
      border: "border-violet-200",
      text: "text-violet-700",
      icon: "text-violet-500",
      label: "text-violet-500",
    },
  };

  const styles = colors[color];

  return (
    <div
      className={`${styles.bg} border ${styles.border} rounded-xl px-5 py-4 flex items-start gap-3`}
    >
      {icon && <div className={`mt-0.5 ${styles.icon}`}>{icon}</div>}
      <div>
        <p
          className={`text-xs font-semibold tracking-wider uppercase ${styles.label}`}
        >
          {label}
        </p>
        <p className={`text-2xl font-bold font-mono mt-0.5 ${styles.text}`}>
          {value}
        </p>
        {sub && (
          <p className={`text-xs mt-0.5 ${styles.label} opacity-70`}>{sub}</p>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [values, setValues] = useState<FormValues>(INITIAL_FORM_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<TelemetryRecord[]>([]);
  const [lastGenerated, setLastGenerated] = useState<{
    count: number;
    elapsed: string;
  } | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleDateString());
  }, []);

  const handleChange = useCallback((field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleGenerate = useCallback(async () => {
    const validation = validateForm(values);

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setErrors({});
    setApiError(null);
    setLoading(true);
    setHasGenerated(true);
    const startedAt = performance.now();

    try {
      const rows = await fetchTelemetryData(values);
      const elapsed = (performance.now() - startedAt).toFixed(0);
      setTableData(rows);
      setLastGenerated({ count: rows.length, elapsed });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to connect to API";
      setApiError(message);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  }, [values]);

  const handleReset = useCallback(() => {
    setValues(INITIAL_FORM_VALUES);
    setErrors({});
    setTableData([]);
    setLastGenerated(null);
    setHasGenerated(false);
    setApiError(null);
  }, []);

  const handleDownloadCSV = useCallback(() => {
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .substring(0, 16);
    const deviceName = values.deviceType.replace(/\s+/g, "_") || "device";

    exportToCSV(tableData, `telemetry_${deviceName}_${timestamp}.csv`);
  }, [tableData, values.deviceType]);

  const handleDownloadExcel = useCallback(() => {
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .substring(0, 16);

    const deviceName = values.deviceType?.replace(/\s+/g, "_") || "device";

    // Create column map from TELEMETRY_COLUMNS
    const columnMap = Object.fromEntries(
      TELEMETRY_COLUMNS.map((col) => [col.key, col.label]),
    );

    exportToExcel(tableData, `telemetry_${deviceName}_${timestamp}`, columnMap);
  }, [tableData, values.deviceType]);
  const totalRecords = tableData.length;
  const faultRecords = tableData.filter(
    (row) => row.CFLTBIT && String(row.CFLTBIT) !== "0",
  ).length;
  const avgTemp =
    tableData.length > 0
      ? (
          tableData.reduce((sum, row) => sum + (Number(row.SINVTEMP) || 0), 0) /
          tableData.length
        ).toFixed(1)
      : "--";
  const totalKwh =
    tableData.length > 0
      ? tableData
          .reduce((sum, row) => sum + (Number(row.PTOTKWH1) || 0), 0)
          .toFixed(1)
      : "--";

  return (
    <div className="min-h-screen bg-slate-100 dot-bg">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1L12.5 4.25V10.75L7 14L1.5 10.75V4.25L7 1Z"
                  stroke="white"
                  strokeWidth="1.3"
                />
                <path d="M7 4L9.5 5.5V8.5L7 10L4.5 8.5V5.5L7 4Z" fill="white" />
              </svg>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-slate-800 text-sm tracking-tight">
                Telemetry Exporter
              </span>
              <span className="text-slate-300 text-xs hidden sm:inline">·</span>
              <span className="text-slate-400 text-xs hidden sm:inline">
                Device Data Simulator
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              System Online
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className="text-slate-400"
              >
                <circle
                  cx="5"
                  cy="5"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M5 2.5V5L6.5 6.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              {API_DISPLAY_ENDPOINT}
            </div>
            <span className="text-xs text-slate-400 font-mono hidden md:block">
              v1.0.0
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Device Data Simulator
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Fetch real pump telemetry records from{" "}
              <span className="font-mono text-blue-600 text-xs">
                {API_DISPLAY_ENDPOINT}
              </span>
            </p>
          </div>
          {lastGenerated && (
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm animate-fade-in">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="text-blue-500"
              >
                <circle
                  cx="6"
                  cy="6"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M6 3V6.5L8 8"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              Last run: {time}
            </div>
          )}
        </div>

        {tableData.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-slide-up">
            <StatCard
              label="Total Records"
              value={totalRecords.toLocaleString("en-IN")}
              sub="from API"
              color="blue"
              icon={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 4h12M2 8h12M2 12h8"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              }
            />
            <StatCard
              label="Fault Records"
              value={faultRecords.toLocaleString("en-IN")}
              sub={faultRecords === 0 ? "All clear" : "Check CFLTBIT"}
              color={faultRecords > 0 ? "amber" : "emerald"}
              icon={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2L14 13H2L8 2Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 6.5V9M8 11V11.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              }
            />
            <StatCard
              label="Avg Inv Temp"
              value={avgTemp === "--" ? "--" : `${avgTemp} C`}
              sub="SINVTEMP mean"
              color="violet"
              icon={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 10V3M8 10C6.34315 10 5 11.3431 5 13C5 14.6569 6.34315 16 8 16C9.65685 16 11 14.6569 11 13C11 11.3431 9.65685 10 8 10Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M10 5H12M10 7H12"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              }
            />
            <StatCard
              label="Total kWh"
              value={totalKwh === "--" ? "--" : totalKwh}
              sub="PTOTKWH1 sum"
              color="emerald"
              icon={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M9 2L4 9H8L7 14L12 7H8L9 2Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FormCard
              values={values}
              onChange={handleChange}
              onGenerate={handleGenerate}
              onReset={handleReset}
              loading={loading}
              errors={errors}
              lastGenerated={lastGenerated}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <p className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-3">
                API Response Fields
              </p>
              <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
                {FIELD_REFERENCE_ITEMS.map((field) => (
                  <div
                    key={field.key}
                    className="flex items-baseline justify-between gap-2 text-xs py-0.5"
                  >
                    <span className="font-mono font-semibold text-slate-700 shrink-0">
                      {field.key}
                    </span>
                    <span className="text-slate-400 text-right leading-tight">
                      {field.desc}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-100">
                46 total fields · All fields shown in table
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <p className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-3">
                Request Payload Preview
              </p>
              <pre className="text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-600 leading-relaxed overflow-auto">
                {`POST /generate
Content-Type: application/json
{
  "imei": "${values.imei || ""}",
  "serialNumber": "${values.serialNumber || ""}",
  "totalEnergy": "${values.totalEnergy || ""}",
  "totalRunHours": "${values.totalRunHours || ""}",
  "totalWaterDischarge": "${values.totalWaterDischarge || ""}",
  "hp": "${values.hp || "<select>"}",
  "deviceType": "${values.deviceType || "<select>"}",
  "fromDate": "${values.fromDate || "YYYY-MM-DD"}",
  "toDate": "${values.toDate || "YYYY-MM-DD"}",
  "count": ${values.dataCount || 0}
}`}
              </pre>
            </div>
          </div>
        </div>

        {apiError && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-start gap-3 animate-fade-in shadow-sm">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-red-500 shrink-0 mt-0.5"
            >
              <circle
                cx="8"
                cy="8"
                r="6"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <path
                d="M8 5.2V8.6M8 10.8V11"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            <div>
              <p className="text-sm font-semibold text-red-800">
                Unable to fetch telemetry data
              </p>
              <p className="text-xs text-red-600 mt-0.5">{apiError}</p>
            </div>
          </div>
        )}

        {(hasGenerated || tableData.length > 0) && (
          <DataTable
            data={tableData}
            loading={loading}
            onDownloadCSV={handleDownloadCSV}
            onDownloadExcel={handleDownloadExcel}
          />
        )}

        {faultRecords > 0 && !loading && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex items-start gap-3 animate-fade-in shadow-sm">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-amber-500 shrink-0 mt-0.5"
            >
              <path
                d="M8 2L14 13H2L8 2Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              <path
                d="M8 6V9M8 11V11.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            <div>
              <p className="text-sm font-semibold text-amber-800">
                {faultRecords} record{faultRecords !== 1 ? "s" : ""} with
                non-zero CFLTBIT
              </p>
              <p className="text-xs text-amber-600 mt-0.5">
                These rows have a fault bit set. Check the CFLTBIT column in the
                table for details.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 mt-12 py-6 px-6 bg-white/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
          <span className="font-mono">
            Telemetry Exporter © 2026 - Internal Tool
          </span>
          <span className="font-mono">
            API: {API_DISPLAY_ENDPOINT} · v1.0.0
          </span>
        </div>
      </footer>
    </div>
  );
}
