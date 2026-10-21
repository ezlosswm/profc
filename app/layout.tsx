import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import logo from "@/public/images/Logo.webp";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://profc.vercel.app/"),

  title: {
    default: "PROFC Belize | Professional MMA Events & Fights",
    template: "%s | PROFC Belize",
  },

  description:
    "Discover PROFC Belize, a professional mixed martial arts promotion bringing exciting MMA events and championship action to Belize.",

  applicationName: "PROFC Belize",

  openGraph: {
    type: "website",
    siteName: "PROFC Belize",
    locale: "en_BZ",
    title: "PROFC Belize | Professional MMA Events & Fights",
    description:
      "Discover professional MMA events, fighters, and championship action in Belize.",
    url: "/",
    images: [
      {
        url: "/public/images/Logo.webp",
        width: 1200,
        height: 630,
        alt: "PROFC Belize MMA",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "PROFC Belize | Professional MMA Events & Fights",
    description:
      "Discover professional MMA events and championship action in Belize.",
    images: ["/images/profc-og.webp"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
