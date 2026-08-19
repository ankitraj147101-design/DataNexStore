import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Datanexstore — High-End Electronics & PC Components",
  description: "India's premier e-commerce destination for custom mechanical keyboards, high-refresh gaming monitors, PCIe NVMe storage, PC hardware, and tech peripherals.",
  keywords: ["datanexstore", "electronics", "hardware", "mechanical keyboards", "gaming monitors", "pc components", "peripherals"],
  authors: [{ name: "Datanexstore India" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-sky-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
