import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { VIEWPORT_BACKGROUND } from "@/lib/siteTheme";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2563eb",
};

export const metadata: Metadata = {
  title: "Icon of the Seas | Souvenir Song — SongZoo",
  description:
    "Create a personalised souvenir song on Icon of the Seas, powered by SongZoo.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Icon of the Seas",
  },
  openGraph: {
    title: "Icon of the Seas · Powered by SongZoo",
    description:
      "Your souvenir song experience on Icon of the Seas, powered by SongZoo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full min-h-screen antialiased`}
      style={{ backgroundColor: VIEWPORT_BACKGROUND }}
    >
      <head>
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body
        className="flex min-h-full min-h-screen flex-col"
        style={{ backgroundColor: VIEWPORT_BACKGROUND }}
      >
        {children}
      </body>
    </html>
  );
}
