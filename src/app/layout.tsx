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
  title: "Activated by AJ | Racquet Sport & Lifestyle",
  description:
    "Turn your energy into purpose. Premium tennis coaching, padel, pickleball, beach sports and fitness with AJ. Your Vibe Activates Your Tribe.",
  keywords: [
    "tennis coach",
    "padel coaching",
    "pickleball coach",
    "beach tennis",
    "fitness coach",
    "racquet sport",
    "Activated by AJ",
  ],
  openGraph: {
    title: "Activated by AJ",
    description: "Turn your energy into purpose.",
    url: "https://activatedbyaj.co.za",
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
