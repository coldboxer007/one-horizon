import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import BootSequence from "@/components/BootSequence";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "1 Horizon — Systems in Motion",
  description:
    "1 Horizon is an AI systems studio building intelligent products across multimodal interfaces, agentic workflows, real-time environments, and embodied systems.",
  openGraph: {
    title: "1 Horizon — Systems in Motion",
    description:
      "Multimodal products, agentic workflows, real-time environments, and embodied systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${mono.variable} ${display.variable} antialiased`}
      >
        <SmoothScroll />
        <BootSequence />
        <Cursor />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
