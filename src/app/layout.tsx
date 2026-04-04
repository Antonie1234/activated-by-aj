import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Activated by AJ | Personal Coaching – Sydney",
  description:
    "Turn your energy into purpose. Tennis coaching, fitness & strength training, and movement & beach sports with AJ — based in Willoughby, Sydney.",
  keywords: [
    "personal trainer Sydney",
    "tennis coach Sydney",
    "fitness coach Willoughby",
    "beach sports training Sydney",
    "Activated by AJ",
  ],
  openGraph: {
    title: "Activated by AJ",
    description: "Turn your energy into purpose.",
    url: "https://activatedbyaj.com",
    siteName: "Activated by AJ",
    locale: "en_AU",
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
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
