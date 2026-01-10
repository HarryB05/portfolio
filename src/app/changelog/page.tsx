import type { Metadata } from "next";
import { GET as getChangelogList } from "../api/changelog/list/route";
import { ChangelogTimeline } from "./ChangelogTimeline";

// Force dynamic rendering since we fetch data at request time
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Changelog",
  description: "View all updates, features, and improvements. Stay up to date with the latest changes and releases.",
  openGraph: {
    title: "Changelog",
    description: "View all updates, features, and improvements. Stay up to date with the latest changes and releases.",
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
      <div className="flex min-h-screen flex-col bg-white dark:bg-black">
        <main className="mx-auto w-full max-w-4xl px-6 py-12">
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-bold text-black dark:text-zinc-50 sm:text-5xl">
              Changelog
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Stay up to date with the latest updates, features, and improvements.
            </p>
          </div>

          {error && (
            <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {!error && <ChangelogTimeline entries={entries} />}
        </main>
      </div>
    </>
  );
}
