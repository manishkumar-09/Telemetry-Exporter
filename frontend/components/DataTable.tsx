"use client";

import React, { useState } from "react";
import { Button } from "./Formelements";
import {
  API_DISPLAY_ENDPOINT,
  TELEMETRY_COLUMNS,
  TelemetryRecord,
} from "@/lib/telemetry";

const CATEGORY_COLORS: Record<string, string> = {
  meta: "bg-slate-100 text-slate-600",
  pump: "bg-blue-50 text-blue-700",
  dc: "bg-violet-50 text-violet-700",
  energy: "bg-emerald-50 text-emerald-700",
  location: "bg-amber-50 text-amber-700",
  device: "bg-sky-50 text-sky-700",
  temp: "bg-orange-50 text-orange-700",
  status: "bg-red-50 text-red-700",
};

interface DataTableProps {
  data: TelemetryRecord[];
  loading: boolean;
  onDownloadCSV: () => void;
  onDownloadExcel: () => void;
}

type ColumnFilter =
  | "all"
  | "pump"
  | "dc"
  | "energy"
  | "temp"
  | "location"
  | "device"
  | "meta";

const FILTERS: ColumnFilter[] = [
  "all",
  "pump",
  "dc",
  "energy",
  "temp",
  "location",
  "device",
  "meta",
];

export function DataTable({
  data,
  loading,
  onDownloadCSV,
  onDownloadExcel,
}: DataTableProps) {
  const [colFilter, setColFilter] = useState<ColumnFilter>("all");
  const [searchCol, setSearchCol] = useState("");

  const normalizedSearch = searchCol.trim().toLowerCase();
  const visibleCols = TELEMETRY_COLUMNS.filter((col) => {
    if (colFilter !== "all" && col.category !== colFilter) return false;

    if (
      normalizedSearch &&
      !col.label.toLowerCase().includes(normalizedSearch) &&
      !String(col.key).toLowerCase().includes(normalizedSearch)
    ) {
      return false;
    }

    if (
      data.length > 0 &&
      !data.some(
        (row) =>
          row[col.key] !== undefined &&
          row[col.key] !== null &&
          row[col.key] !== "",
      )
    ) {
      return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm animate-fade-in">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse-fast" />
          <span className="text-sm font-semibold text-slate-600">
            Fetching telemetry data from API...
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-slate-200" />
            <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-t-blue-500 animate-spin-slow" />
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-500 font-medium">
              Requesting records from {API_DISPLAY_ENDPOINT}
            </p>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              POST /generate
            </p>
          </div>
          <div className="w-full max-w-2xl px-6 mt-2 space-y-2">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-9 bg-slate-100 rounded-lg animate-pulse"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm animate-fade-in">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
            Output - Telemetry Records
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center px-6">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-slate-400"
            >
              <path
                d="M3 3L21 21M10.5 3H19C20.1046 3 21 3.89543 21 5V13.5M14 21H5C3.89543 21 3 20.1046 3 19V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M8 9H8.01M8 13H8.01M12 9H12.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="text-sm font-semibold text-slate-500">
            No telemetry data yet
          </p>
          <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
            Configure parameters above and click{" "}
            <span className="text-blue-600 font-medium">Generate Data</span> to
            fetch records from the API.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-x-visible shadow-sm animate-slide-up">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold text-slate-700">
              Telemetry Records
            </span>
            <span className="font-mono text-xs px-2 py-0.5 bg-blue-100 text-blue-700 border border-blue-200 rounded-md">
              {data.length.toLocaleString("en-IN")} rows
            </span>
            <span className="font-mono text-xs px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-md">
              {visibleCols.length} columns
            </span>
          </div>
          <div>
            <Button
              variant="secondary"
              size="sm"
              onClick={onDownloadCSV}
              icon={
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M6.5 1V9M6.5 9L3.5 6M6.5 9L9.5 6"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 10.5V11.5C1 11.7761 1.22386 12 1.5 12H11.5C11.7761 12 12 11.7761 12 11.5V10.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              }
            >
              Export CSV
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onDownloadExcel}
              icon={
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M6.5 1V9M6.5 9L3.5 6M6.5 9L9.5 6"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 10.5V11.5C1 11.7761 1.22386 12 1.5 12H11.5C11.7761 12 12 11.7761 12 11.5V10.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              }
            >
              Export Excel
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-xs text-slate-400 font-medium shrink-0">
            Filter columns:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setColFilter(cat)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all capitalize ${
                  colFilter === cat
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="ml-auto">
            <div className="relative">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
              >
                <circle
                  cx="5"
                  cy="5"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M8.5 8.5L11 11"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="text"
                value={searchCol}
                onChange={(e) => setSearchCol(e.target.value)}
                placeholder="Search columns..."
                className="pl-7 pr-3 py-1 text-xs border border-slate-200 rounded-md outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-700 placeholder:text-slate-400 w-36"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-auto max-h-[520px]">
        <table className="w-full text-sm border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase text-slate-400 whitespace-nowrap sticky left-0 bg-slate-50 shadow-sm">
                #
              </th>
              {visibleCols.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase whitespace-nowrap"
                >
                  <span
                    className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
                      CATEGORY_COLORS[col.category] ??
                      "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {col.label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-slate-100 hover:bg-blue-50/30 transition-colors duration-75 animate-row-in"
                style={{ animationDelay: `${Math.min(idx * 0.015, 0.4)}s` }}
              >
                <td className="px-4 py-2.5 font-mono text-xs text-slate-400 sticky left-0 bg-white border-r border-slate-100">
                  {idx + 1}
                </td>
                {visibleCols.map((col) => {
                  const value = row[col.key];
                  const display =
                    value === null || value === undefined
                      ? "--"
                      : String(value);

                  return (
                    <td
                      key={col.key}
                      className={`px-4 py-2.5 text-xs whitespace-nowrap max-w-[160px] truncate ${
                        col.mono ? "font-mono text-slate-700" : "text-slate-600"
                      } ${
                        col.key === "CFLTBIT" &&
                        display !== "0" &&
                        display !== "--"
                          ? "text-red-600 font-semibold"
                          : ""
                      }`}
                      title={display}
                    >
                      {display}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs text-slate-400 font-mono">
          Showing all {data.length.toLocaleString()} records ·{" "}
          {visibleCols.length} of {TELEMETRY_COLUMNS.length} columns visible
        </p>
      </div>
    </div>
  );
}
