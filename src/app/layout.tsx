import type { Metadata } from "next";
import { Playfair_Display, Merriweather } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Harry Barnish - Computer Science Student & Developer",
  description: "Computer Science student passionate about building innovative solutions and creating impactful projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${merriweather.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
