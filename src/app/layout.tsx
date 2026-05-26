import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoldDivider from "@/components/GoldDivider";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Activated by AJ | Racquet Sport & Lifestyle",
  description:
    "Activated by AJ — premium racquet sport coaching, padel facility development, and AI performance technology. Your Vibe Activates Your Tribe.",
  keywords: [
    "tennis coach",
    "padel coaching",
    "pickleball coach",
    "beach tennis",
    "fitness coach",
    "racquet sport",
    "Activated by AJ",
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
    title: "Activated by AJ",
    description: "Turn your energy into purpose.",
    url: "https://activatedbyaj.co.za",
    siteName: "Activated by AJ",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Activated by AJ",
              "url": "https://activatedbyaj.co.za",
              "logo": "https://activatedbyaj.co.za/logo.png",
            }),
          }}
        />
        <Navbar />
        <main>{children}</main>
        <GoldDivider />
        <Footer />
      </body>
    </html>
  );
}
