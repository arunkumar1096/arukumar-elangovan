import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Serif_Tamil } from "next/font/google";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { Agentation } from "agentation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mackinac = localFont({
  src: "./fonts/P22MackinacProBook.ttf",
  variable: "--font-mackinac",
  display: "swap",
});

const notoSerifTamil = Noto_Serif_Tamil({
  variable: "--font-tamil",
  subsets: ["tamil"],
  weight: ["400", "500"],
  display: "swap",
});

const BASE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Arunkumar Elangovan | Product Designer",
    template: "%s | Arunkumar Elangovan",
  },
  description:
    "Senior product designer specialising in AI-powered products and marketing technology.",
  openGraph: {
    title: "Arunkumar Elangovan | Product Designer",
    description:
      "Senior product designer specialising in AI-powered products and marketing technology.",
    url: "/",
    siteName: "Arunkumar Elangovan",
    images: [{ url: "/opengraph.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arunkumar Elangovan | Product Designer",
    description:
      "Senior product designer specialising in AI-powered products and marketing technology.",
    images: ["/opengraph.png"],
  },
  icons: {
    icon: [
      {
        url: "/favicon-light.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arunkumar Elangovan",
  jobTitle: "Senior Product Designer",
  worksFor: { "@type": "Organization", name: "MoEngage" },
  description:
    "Senior product designer specialising in AI-powered products and marketing technology.",
  url: BASE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mackinac.variable} ${notoSerifTamil.variable} antialiased`}
      >
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
      <Analytics />
      <GoogleAnalytics gaId="G-22T1KDCYY1" />
    </html>
  );
}
