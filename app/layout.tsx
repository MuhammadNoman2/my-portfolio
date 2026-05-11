import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Noman — Software Developer & CTO",
  description:
    "Portfolio of Muhammad Noman — Software Developer & CTO of Tech Triggers. Building full-stack web apps (React, Next.js, Node.js), Flutter mobile apps, and AI-powered platforms from Islamabad, Pakistan.",
  keywords: [
    "Software Developer", "CTO", "Tech Triggers", "Flutter Developer",
    "React Developer", "Next.js", "Node.js", "Full-Stack Developer", "Islamabad", "Pakistan",
  ],
  authors: [{ name: "Muhammad Noman" }],
  creator: "Muhammad Noman",
  openGraph: {
    type: "website",
    title: "Muhammad Noman — Software Developer & CTO",
    description: "Full-stack web & mobile developer. CTO of Tech Triggers.",
    siteName: "Noman.dev",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
