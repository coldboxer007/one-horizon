import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import { contact, team } from "@/lib/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://1horizon-ai.com";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "1 Horizon",
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  email: contact.email,
  description:
    "AI systems studio building multimodal products, agentic workflows, real-time environments, and embodied systems.",
  member: team.map((m) => ({
    "@type": "Person",
    name: m.name,
    jobTitle: m.role,
    sameAs: m.linkedin,
  })),
};

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
  metadataBase: new URL(siteUrl),
  title: "1 Horizon — Systems in Motion",
  description:
    "1 Horizon is an AI systems studio building intelligent products across multimodal interfaces, agentic workflows, real-time environments, and embodied systems.",
  openGraph: {
    title: "1 Horizon — Systems in Motion",
    description:
      "Multimodal products, agentic workflows, real-time environments, and embodied systems.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "1 Horizon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "1 Horizon — Systems in Motion",
    description:
      "Multimodal products, agentic workflows, real-time environments, and embodied systems.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#04060d",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${mono.variable} ${display.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <div className="dawn" aria-hidden />
        <SmoothScroll />
        <Cursor />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
