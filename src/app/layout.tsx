import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AbstractProvider from "@/components/AbstractProvider";
import Nav from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MintBay",
  description: "Mint Fully onchain NFTs on Abstract",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AbstractProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Nav />
          {children}
        </body>
      </AbstractProvider>
    </html>
  );
}
