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

// ─── Site config ─────────────────────────────────────────────────────────────

const SITE_URL = "https://myportfolio.techtrigger.org";
const FULL_NAME = "Muhammad Noman";
const JOB_TITLE = "Software Developer & CTO";
const TAGLINE =
  "Software Developer & CTO of Tech Triggers. Building full-stack web apps (React, Next.js, Node.js), Flutter mobile apps, and AI-powered platforms from Islamabad, Pakistan.";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${FULL_NAME} — ${JOB_TITLE}`,
    template: `%s | ${FULL_NAME}`,
  },
  description: TAGLINE,

  keywords: [
    "Muhammad Noman",
    "Software Developer Pakistan",
    "Flutter Developer Pakistan",
    "React Developer Pakistan",
    "Next.js Developer",
    "Full Stack Developer Islamabad",
    "CTO Tech Triggers",
    "Mobile App Developer Pakistan",
    "Node.js Developer",
    "Python Developer",
    "Web Developer Islamabad",
    "Freelance Developer Pakistan",
    "Flutter App Developer",
    "Firebase Developer",
    "Supabase Developer",
    "Tech Triggers",
    "Muhammad Noman Flutter",
    "Muhammad Noman Developer",
  ],

  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,

  // ── Indexing ──────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: `${FULL_NAME} — Portfolio`,
    title: `${FULL_NAME} — ${JOB_TITLE}`,
    description: TAGLINE,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: `${FULL_NAME} — ${JOB_TITLE}`,
        type: "image/svg+xml",
      },
    ],
  },

  // ── Twitter / X Card ─────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: `${FULL_NAME} — ${JOB_TITLE}`,
    description: TAGLINE,
    images: ["/og-image.svg"],
  },

  // ── Canonical ────────────────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },

  // ── Icons ────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  // ── Misc ─────────────────────────────────────────────────────────────────
  category: "technology",
};

// ─── Viewport ────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

// ─── JSON-LD structured data ─────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: FULL_NAME,
      url: SITE_URL,
      jobTitle: JOB_TITLE,
      description: TAGLINE,
      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}/profile.png`,
      },
      worksFor: {
        "@type": "Organization",
        name: "Tech Triggers",
        url: "https://techtrigger.org",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Islamabad",
        addressCountry: "PK",
      },
      sameAs: [
        "https://github.com/MuhammadNoman2",
        "https://www.linkedin.com/in/muhammadnomanflutter/",
      ],
      knowsAbout: [
        "React", "Next.js", "Flutter", "Dart", "Node.js",
        "Python", "Django", "TypeScript", "Firebase",
        "Supabase", "PostgreSQL", "Tailwind CSS",
      ],
      email: "m.nouman.1320@gmail.com",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${FULL_NAME} — Portfolio`,
      description: TAGLINE,
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: `${FULL_NAME} — ${JOB_TITLE}`,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      description: TAGLINE,
      inLanguage: "en-US",
    },
  ],
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to font origins for faster load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Web app manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Explicit canonical for static export */}
        <link rel="canonical" href={SITE_URL} />
      </head>
      <body>{children}</body>
    </html>
  );
}
