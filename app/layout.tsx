import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {inter} from "@/app/ui/fonts";
export const metadata: Metadata = {
  title: "BotCrew Test",
  description: "Test assigment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
