import type { Metadata } from "next";
import { Playfair_Display, Merriweather } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harry Barnish",
  description: "Computer Science and Management student at Queen Mary University of London, focused on software development, data systems, and technology-driven business solutions.",
  keywords: ["Harry Barnish", "Computer Science", "Developer", "Portfolio", "Queen Mary University", "Software Development"],
  authors: [{ name: "Harry Barnish" }],
  creator: "Harry Barnish",
  publisher: "Harry Barnish",
  metadataBase: new URL('https://harrybarnish.co.uk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: "Harry Barnish",
    description: "Computer Science and Management student at Queen Mary University of London, focused on software development, data systems, and technology-driven business solutions.",
    siteName: "Harry Barnish Portfolio",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Harry Barnish",
    description: "Computer Science and Management student at Queen Mary University of London, focused on software development, data systems, and technology-driven business solutions.",
    creator: '@harrybarnish',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.classList.add('preload');
              window.addEventListener('load', function() {
                document.documentElement.classList.remove('preload');
              });
            `,
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${merriweather.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
