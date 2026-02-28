import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Tango — Swipe to Your Next Opportunity",
  description: "A swipe-based matching app connecting job applicants with recruiters",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${plusJakartaSans.variable} font-display antialiased`}>
        <Auth0Provider>
          {children}
          <BottomNav />
        </Auth0Provider>
      </body>
    </html>
  );
}
