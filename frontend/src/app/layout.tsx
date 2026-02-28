import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tango — Swipe to Your Next Opportunity",
  description: "A swipe-based matching app connecting job applicants with recruiters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
