import type { Metadata } from "next";
import { GET as getChangelogList } from "../api/changelog/list/route";
import { ChangelogTimeline } from "./ChangelogTimeline";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Use ISR (Incremental Static Regeneration) for better performance
// Revalidate every 5 minutes to keep content fresh
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Changelog - Powered by Chronalog",
  description: "Track updates and improvements to my portfolio. This changelog is powered by Chronalog, a changelog management system I built.",
  openGraph: {
    title: "Changelog - Powered by Chronalog",
    description: "Track updates and improvements to my portfolio. This changelog is powered by Chronalog, a changelog management system I built.",
    url: "/changelog",
  },
  alternates: {
    canonical: "/changelog",
  },
};

interface ChangelogEntry {
  slug: string;
  title: string;
  date: string;
  version?: string;
  tags?: string[];
  features?: string[];
  bugfixes?: string[];
  body?: string;
}

async function fetchChangelogEntries(): Promise<ChangelogEntry[]> {
  try {
    // Directly call the route handler function instead of making an HTTP request
    // This avoids Vercel deployment protection and is more efficient
    const response = await getChangelogList();
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.details || `Failed to fetch changelog entries: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'API returned unsuccessful response');
    }
    
    if (!Array.isArray(data.entries)) {
      console.error('Invalid entries data:', data);
      throw new Error('Invalid response from API: entries is not an array');
    }
    
    // Sort entries by date, newest first
    return data.entries.sort((a: ChangelogEntry, b: ChangelogEntry) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error fetching changelog entries:', error);
    throw error;
  }
}

export default async function ChangelogPage() {
  let entries: ChangelogEntry[] = [];
  let error: string | null = null;

  try {
    entries = await fetchChangelogEntries();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load changelog entries";
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Changelog",
    description: "View all updates, features, and improvements",
    url: "/changelog",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-20 sm:pt-24 px-4 sm:px-6 pb-16 sm:pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-foreground font-playfair">
                Changelog
              </h1>
              <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed font-merriweather px-4 mb-3">
                Track updates and improvements to my portfolio.
              </p>
              <p className="text-sm text-foreground/50 max-w-3xl mx-auto font-merriweather px-4">
                This changelog is powered by <a href="https://www.chronalog.dev" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary transition-colors underline decoration-1 underline-offset-2">Chronalog</a>, a changelog management Next.js package I built.
              </p>
            </div>

            {error && (
              <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                <p className="text-sm text-red-600 dark:text-red-400 font-merriweather">{error}</p>
              </div>
            )}

            {!error && <ChangelogTimeline entries={entries} />}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
