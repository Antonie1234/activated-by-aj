import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Activated by AJ | Racquet Sport & Lifestyle",
  description:
    "Activated by AJ — Australia's premium padel facility concept broker. We identify opportunities, connect investors, and build the Activated brand across every facility.",
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
      </body>
    </html>
  );
}
