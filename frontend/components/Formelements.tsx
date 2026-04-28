"use client";

import React from "react";

interface SelectFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  error?: string;
  icon?: React.ReactNode;
}

export function SelectField({
  label,
  id,
  value,
  onChange,
  options,
  error,
  icon,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold tracking-widest uppercase text-slate-400"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            {icon}
          </div>
        )}
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full appearance-none bg-white border rounded-lg px-3 py-2.5 text-sm text-gray-900
            transition-all duration-150 outline-none cursor-pointer
            focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
            ${icon ? "pl-9" : "pl-3"}
            ${error ? "border-red-500/70 bg-red-950/20" : "border-slate-200 hover:border-slate-600"}
          `}
        >
          <option value="" disabled className="text-gray-500">
            Select {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 4L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1 animate-fade-in">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="shrink-0"
          >
            <circle
              cx="6"
              cy="6"
              r="5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M6 3.5V6.5M6 8V8.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

interface DateInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  min?: string;
  max?: string;
}

export function DateInput({
  label,
  id,
  value,
  onChange,
  error,
  min,
  max,
}: DateInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold tracking-widest uppercase text-slate-400"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect
              x="1"
              y="2.5"
              width="12"
              height="10.5"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path d="M1 5.5H13" stroke="currentColor" strokeWidth="1.2" />
            <path
              d="M4.5 1V4M9.5 1V4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <input
          type="date"
          id={id}
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full bg-white border rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-900
            transition-all duration-150 outline-none
            focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
            [color-scheme-light]
            ${error ? "border-red-500/70 bg-red-950/20" : "border-slate-200 hover:border-slate-600"}
          `}
        />
      </div>
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1 animate-fade-in">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="shrink-0"
          >
            <circle
              cx="6"
              cy="6"
              r="5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M6 3.5V6.5M6 8V8.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

interface NumberInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  type?: any;
}

export function NumberInput({
  label,
  id,
  value,
  onChange,
  placeholder,
  error,
  min,
  max,
  disabled,
  type,
}: NumberInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold tracking-widest uppercase text-slate-400"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7H12M7 2V12"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <input
          type="text"
          id={id}
          value={value}
          min={min}
          max={max}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`
            w-full bg-white border rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-900
            transition-all duration-150 outline-none font-mono
            focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
            placeholder:text-gray-400 placeholder:font-sans
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
            ${
              disabled
                ? "bg-gray-100 border-slate-200 cursor-not-allowed opacity-60"
                : error
                  ? "border-red-500/70 bg-red-950/20"
                  : "border-slate-200 hover:border-slate-600"
            }
          `}
        />
      </div>
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1 animate-fade-in">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="shrink-0"
          >
            <circle
              cx="6"
              cy="6"
              r="5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M6 3.5V6.5M6 8V8.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: React.ReactNode;
  size?: "sm" | "md";
}

export function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  loading,
  type = "button",
  className = "",
  icon,
  size = "md",
}: ButtonProps) {
  const base = `
    inline-flex items-center justify-center gap-2 font-semibold rounded-lg
    transition-all duration-150 select-none outline-none
    focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
    disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none
  `;
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
  };
  const variants = {
    primary: `
      bg-blue-600 text-white border border-blue-500
      hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-px
      active:translate-y-0 active:bg-blue-700
    `,
    secondary: `
      bg-slate-800 text-slate-200 border border-slate-200
      hover:bg-slate-700 hover:border-slate-600 hover:-translate-y-px
      active:translate-y-0
    `,
    ghost: `
      bg-transparent text-slate-400 border border-transparent
      hover:bg-slate-800 hover:text-slate-200
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <svg
          className="animate-spin-slow w-4 h-4"
          viewBox="0 0 16 16"
          fill="none"
        >
          <circle
            cx="8"
            cy="8"
            r="6"
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity="0.25"
          />
          <path
            d="M8 2A6 6 0 0 1 14 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ) : icon ? (
        <span className="opacity-80">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}

interface InputFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  allowDecimal?: boolean;
  text?: any;
}

export function InputField({
  label,
  id,
  value,
  onChange,
  error,
  allowDecimal,
  text,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold tracking-widest uppercase text-slate-400"
      >
        {label}
      </label>

      <input
        id={id}
        type="text"
        inputMode={allowDecimal ? "decimal" : "numeric"}
        value={value || ""}
        onChange={(e) => {
          const nextValue = e.target.value;

          //  Serial Number → allow alphanumeric only
          if (id === "asn_11" && !/^[A-Za-z0-9]*$/.test(nextValue)) return;

          //  Numbers only
          if (text === "number" && !allowDecimal && !/^\d*$/.test(nextValue))
            return;

          //  Decimal numbers
          if (
            text === "number" &&
            allowDecimal &&
            !/^\d*\.?\d*$/.test(nextValue)
          )
            return;

          onChange(nextValue);
        }}
        className={`
          w-full bg-white border rounded-lg px-3 py-2.5 text-sm text-gray-900
          transition-all duration-150 outline-none
          focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
          ${
            error
              ? "border-red-500/70 bg-red-950/20"
              : "border-slate-200 hover:border-slate-600"
          }
        `}
      />

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
