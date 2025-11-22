import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const alexandria = Alexandria({
  subsets: ["latin"],
  variable: "--font-alexandria",
});

export const metadata: Metadata = {
  title: "Ryeo Labs | Innovation Laboratory by Anne Reyes",
  description:
    "Keep Moving Forward. Exploring technology, innovation, and the future with Ryeo Labs.",
  openGraph: {
    title: "Ryeo Labs",
    description: "Innovation Laboratory by Anne Reyes",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={alexandria.variable}>
      <body className="bg-ryeo-light text-ryeo-dark font-alexandria">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
