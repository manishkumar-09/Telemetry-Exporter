import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Telemetry Exporter",
  description: "Device Data Generator & Telemetry Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
