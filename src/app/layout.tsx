import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ConditionalSiteChrome from "@/components/ConditionalSiteChrome";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Activated | Sport. Energy. Movement.",
  description:
    "Activated is a premium racquet sports coaching, padel venue development, and AI performance brand powered by Reflect Motion technology.",
  keywords: [
    "tennis coach",
    "padel coaching",
    "pickleball coach",
    "beach tennis",
    "fitness coach",
    "racquet sport",
    "padel venue development",
    "AI performance",
    "Reflect Motion",
    "Activated",
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "Activated | Sport. Energy. Movement.",
    description: "Activated is a premium racquet sports coaching, padel venue development, and AI performance brand powered by Reflect Motion technology.",
    url: "https://activatedbyaj.co.za",
    siteName: "Activated",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://activatedbyaj.co.za/hero-poster.jpg",
        width: 1280,
        height: 720,
        alt: "Activated — Sport. Energy. Movement.",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/hero-poster.jpg" as="image" fetchPriority="high" />
      </head>
      <body className={`${geist.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Activated",
              "url": "https://activatedbyaj.co.za",
              "logo": "https://activatedbyaj.co.za/logo.png",
            }),
          }}
        />
        <ConditionalSiteChrome>{children}</ConditionalSiteChrome>
      </body>
    </html>
  );
}
