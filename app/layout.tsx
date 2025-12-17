import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hush IIoT Digital Nursery",
  description:
    "Next-level caring for Neonatal Intensive Care Units using AI-powered crying analytics and medical-grade sensors.",
  icons: {
    icon: [
      {
        url: "/logo.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Hush IIoT Digital Nursery",
    description:
      "Next-level caring for Neonatal Intensive Care Units using AI-powered crying analytics and medical-grade sensors.",
    url: "https://hush.digital-nursery",
    siteName: "Hush IIoT Digital Nursery",
  },
  metadataBase: new URL("https://hush.digital-nursery"),
  alternates: {
    canonical: "https://hush.digital-nursery",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plexSans.variable} ${spaceGrotesk.variable} bg-midnight-900 text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
