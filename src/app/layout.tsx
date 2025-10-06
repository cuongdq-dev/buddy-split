import { Toaster } from "@buddy/components/ui/sonner";
import { AuthProvider } from "@buddy/lib/auth-context";
import { I18nProvider } from "@buddy/lib/i18n-context";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import "./globals.css";
import useFcmToken from "@buddy/hooks/use-fcmToken";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SplitWise - Share Expenses",
  description: "Share expenses with friends and groups effortlessly",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <AuthProvider>
          <I18nProvider>
            <Toaster />
            {children}
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
