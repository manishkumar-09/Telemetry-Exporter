"use client";

import {
  Button,
  DateInput,
  InputField,
  NumberInput,
  SelectField,
} from "./Formelements";
import {
  DEVICE_OPTIONS,
  FormErrors,
  FormValues,
  HP_OPTIONS,
} from "@/lib/telemetry";

interface FormCardProps {
  values: FormValues;
  onChange: (field: keyof FormValues, value: string) => void;
  onGenerate: () => void;
  onReset: () => void;
  loading: boolean;
  errors: FormErrors;
  lastGenerated?: { count: number; elapsed: string } | null;
}

export function FormCard({
  values,
  onChange,
  onGenerate,
  onReset,
  loading,
  errors,
  lastGenerated,
}: FormCardProps) {
  const isDateRange = Boolean(
    values.fromDate && values.toDate && values.fromDate !== values.toDate,
  );

  const requiresDataCount = !values.toDate || values.fromDate === values.toDate;
  const hasValidDataCount = !requiresDataCount || Number(values.dataCount) > 0;
  const hasValidDateRange = !values.toDate || values.fromDate <= values.toDate;
  const isFormValid = Boolean(
    values.hp &&
    values.deviceType &&
    values.fromDate &&
    hasValidDateRange &&
    hasValidDataCount,
  );

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center" />
          <div>
            <h2 className="text-sm font-semibold text-gray-700">
              Generation Parameters
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Configure device and time range
            </p>
          </div>
        </div>

        {lastGenerated && (
          <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-600 font-mono bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {lastGenerated.count} rows · {lastGenerated.elapsed}ms
          </div>
        )}
      </div>

      <div className="p-6 space-y-6 bg-white">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-700 mb-4 flex items-center gap-2">
            Device Configuration
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              text={"number"}
              label="IMEI"
              id="imei"
              value={values.imei}
              onChange={(value) => onChange("imei", value)}
            />

            <InputField
              text={"text"}
              label="Serial Number"
              id="asn_11"
              value={values.serialNumber}
              onChange={(value) => onChange("serialNumber", value)}
            />

            <InputField
              text={"number"}
              label="Total Water Discharge"
              id="waterDischarge"
              value={values.totalWaterDischarge}
              onChange={(value) => onChange("totalWaterDischarge", value)}
              allowDecimal
            />

            <InputField
              text={"number"}
              label="Total Run Hours"
              id="runHours"
              value={values.totalRunHours}
              onChange={(value) => onChange("totalRunHours", value)}
              allowDecimal
            />

            <InputField
              text={"number"}
              label="Total Energy"
              id="totalEnergy"
              value={values.totalEnergy}
              onChange={(value) => onChange("totalEnergy", value)}
              allowDecimal
            />

            <SelectField
              label="HP Rating"
              id="hp"
              value={values.hp}
              onChange={(value) => onChange("hp", value)}
              options={HP_OPTIONS}
              error={errors.hp}
            />

            <SelectField
              label="Device Type"
              id="deviceType"
              value={values.deviceType}
              onChange={(value) => onChange("deviceType", value)}
              options={DEVICE_OPTIONS}
              error={errors.deviceType}
            />
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DateInput
              label="From Date"
              id="fromDate"
              value={values.fromDate}
              onChange={(value) => onChange("fromDate", value)}
              error={errors.fromDate}
              max={values.toDate || undefined}
            />

            <DateInput
              label="To Date"
              id="toDate"
              value={values.toDate}
              onChange={(value) => onChange("toDate", value)}
              error={errors.toDate}
              min={values.fromDate || undefined}
            />
          </div>
        </div>

        <div>
          <NumberInput
            label="Record Count"
            id="dataCount"
            value={values.dataCount}
            onChange={(value) => onChange("dataCount", value)}
            placeholder="e.g. 1000"
            error={errors.dataCount}
            disabled={isDateRange}
            min={1}
            max={100000}
          />
        </div>
      </div>

      <div className="px-6 py-4 border-t border-slate-200 bg-gray-50 flex items-center justify-between">
        <Button variant="secondary" onClick={onReset} disabled={loading}>
          Reset
        </Button>

        <Button
          variant="primary"
          onClick={onGenerate}
          disabled={!isFormValid}
          loading={loading}
        >
          {loading ? "Generating..." : "Generate Data"}
        </Button>
      </div>
    </div>
  );
}
