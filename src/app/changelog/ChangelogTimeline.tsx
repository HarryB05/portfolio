"use client";

import { useState, useMemo } from "react";
import { FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";

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

interface ChangelogTimelineProps {
  entries: ChangelogEntry[];
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function ChangelogTimeline({ entries }: ChangelogTimelineProps) {
  const [selectedMajorVersion, setSelectedMajorVersion] = useState<string | null>(null);
  const [selectedMinorVersion, setSelectedMinorVersion] = useState<string | null>(null);

  // Get unique major versions (e.g., "1.0.0", "2.0.0")
  const uniqueVersions = useMemo(() => {
    const allVersions = entries
      .map((entry) => entry.version)
      .filter((v): v is string => !!v);

    // Extract unique major versions (e.g., "1", "2", "3")
    const majorVersions = new Set<string>();
    allVersions.forEach((version: string) => {
      const major = version.split(".")[0];
      majorVersions.add(major);
    });

    // Convert to major.0.0 format and sort
    const versions = Array.from(majorVersions)
      .map((major) => `${major}.0.0`)
      .sort((a: string, b: string) => {
        // Sort versions semantically
        const aParts = a.split(".").map(Number);
        const bParts = b.split(".").map(Number);
        for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
          const aPart = aParts[i] || 0;
          const bPart = bParts[i] || 0;
          if (aPart !== bPart) return bPart - aPart;
        }
        return 0;
      });
    return versions;
  }, [entries]);

  // Get minor versions for selected major version (only x.y.0, not patch versions)
  const minorVersions = useMemo(() => {
    if (!selectedMajorVersion) return [];

    const majorVersion = selectedMajorVersion.split(".")[0];
    const allVersions = entries
      .map((entry) => entry.version)
      .filter((v): v is string => !!v)
      .filter((v: string) => {
        const entryMajor = v.split(".")[0];
        return entryMajor === majorVersion;
      })
      // Only include minor versions (x.y.0 format, patch must be 0)
      .filter((v: string) => {
        const parts = v.split(".").map(Number);
        return parts.length >= 3 && parts[2] === 0;
      })
      .filter((v: string, index: number, self: string[]) => self.indexOf(v) === index)
      .sort((a: string, b: string) => {
        // Sort versions semantically
        const aParts = a.split(".").map(Number);
        const bParts = b.split(".").map(Number);
        for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
          const aPart = aParts[i] || 0;
          const bPart = bParts[i] || 0;
          if (aPart !== bPart) return bPart - aPart;
        }
        return 0;
      });
    return allVersions;
  }, [entries, selectedMajorVersion]);

  // Filter entries based on selected version
  const filteredEntries = useMemo(() => {
    if (!selectedMajorVersion) return entries;

    const majorVersion = selectedMajorVersion.split(".")[0];

    let filtered = entries.filter((entry: ChangelogEntry) => {
      if (!entry.version) return false;
      const entryMajor = entry.version.split(".")[0];
      return entryMajor === majorVersion;
    });

    // If minor version is selected, filter to show all patch versions within that minor version
    if (selectedMinorVersion) {
      const minorVersionParts = selectedMinorVersion.split(".");
      if (minorVersionParts.length >= 2) {
        const majorMinorPrefix = `${minorVersionParts[0]}.${minorVersionParts[1]}.`;
        filtered = filtered.filter((entry: ChangelogEntry) => {
          return entry.version?.startsWith(majorMinorPrefix);
        });
      }
    }

    return filtered;
  }, [entries, selectedMajorVersion, selectedMinorVersion]);

  if (entries.length === 0) {
    return (
      <div className="mb-12 rounded-lg border border-zinc-200 bg-zinc-50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
        <FileText className="mx-auto mb-4 h-12 w-12 text-zinc-400 dark:text-zinc-600" />
        <h2 className="mb-2 text-xl font-semibold text-black dark:text-zinc-50">
          No changelog entries yet
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Changelog entries will appear here once they're created.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Version Filter */}
      {uniqueVersions.length > 0 && (
        <div className="mb-8 space-y-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Filter by Major Version
            </h3>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              <button
                onClick={() => {
                  setSelectedMajorVersion(null);
                  setSelectedMinorVersion(null);
                }}
                className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedMajorVersion === null
                    ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300"
                    : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                All Versions
              </button>
              {uniqueVersions.map((version: string) => {
                return (
                  <button
                    key={version}
                    onClick={() => {
                      setSelectedMajorVersion(version);
                      setSelectedMinorVersion(null);
                    }}
                    className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                      selectedMajorVersion === version
                        ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300"
                        : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    }`}
                  >
                    v{version}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Minor Version Selector - only show when major version is selected */}
          {selectedMajorVersion && minorVersions.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Filter by Minor Version
              </h3>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                <button
                  onClick={() => setSelectedMinorVersion(null)}
                  className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedMinorVersion === null
                      ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300"
                      : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }`}
                >
                  All {selectedMajorVersion.split(".")[0]}.x.x
                </button>
                {minorVersions.map((version: string) => {
                  return (
                    <button
                      key={version}
                      onClick={() => setSelectedMinorVersion(version)}
                      className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                        selectedMinorVersion === version
                          ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300"
                          : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      }`}
                    >
                      v{version}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Timeline */}
      {filteredEntries.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            No entries found for the selected filter.
          </p>
        </div>
      ) : (
        <div className="space-y-0">
          {filteredEntries.map((entry, index) => {
            const isLatest = entries.length > 0 && entry.slug === entries[0].slug;
            return (
              <div key={entry.slug} className="relative">
                {/* Timeline line */}
                {index < filteredEntries.length - 1 && (
                  <div className="absolute left-[15px] top-8 h-full w-0.5 bg-zinc-200 dark:bg-zinc-800" />
                )}

                <div className="relative flex gap-4">
                  {/* Date circle */}
                  <div className={`relative z-0 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${isLatest ? "border-blue-500 bg-blue-100 dark:border-blue-400 dark:bg-blue-900/30" : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"}`}>
                    <div className={`h-2 w-2 rounded-full ${isLatest ? "bg-blue-600 dark:bg-blue-400" : "bg-zinc-400 dark:bg-zinc-600"}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2 pb-8">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        {formatDate(entry.date)}
                      </span>
                      {entry.version && (
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${isLatest ? "bg-blue-200 text-blue-900 dark:bg-blue-900/50 dark:text-blue-200" : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"}`}>
                          {entry.version}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <h3 className={`flex-1 text-lg font-semibold ${isLatest ? "text-blue-900 dark:text-blue-100" : "text-zinc-900 dark:text-zinc-50"}`}>
                        {entry.title}
                      </h3>
                    </div>

                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {entry.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {entry.features && entry.features.length > 0 && (
                      <div className="space-y-1">
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                          Features
                        </h4>
                        <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                          {entry.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2">
                              <span className="text-2xl leading-none text-green-600 dark:text-green-400">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {entry.bugfixes && entry.bugfixes.length > 0 && (
                      <div className="space-y-1">
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                          Bug Fixes
                        </h4>
                        <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                          {entry.bugfixes.map((bugfix, bugfixIndex) => (
                            <li key={bugfixIndex} className="flex items-center gap-2">
                              <span className="text-2xl leading-none text-red-600 dark:text-red-400">•</span>
                              <span>{bugfix}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {entry.body && (
                      <div className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                        <ReactMarkdown
                          components={{
                            p: ({ children }: { children?: React.ReactNode }) => <p className="mb-2">{children}</p>,
                            h1: ({ children }: { children?: React.ReactNode }) => <h1 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">{children}</h1>,
                            h2: ({ children }: { children?: React.ReactNode }) => <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">{children}</h2>,
                            h3: ({ children }: { children?: React.ReactNode }) => <h3 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">{children}</h3>,
                            ul: ({ children }: { children?: React.ReactNode }) => <ul className="ml-4 list-disc space-y-1">{children}</ul>,
                            ol: ({ children }: { children?: React.ReactNode }) => <ol className="ml-4 list-decimal space-y-1">{children}</ol>,
                            li: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
                            strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-semibold text-zinc-900 dark:text-zinc-50">{children}</strong>,
                            em: ({ children }: { children?: React.ReactNode }) => <em className="italic">{children}</em>,
                            code: ({ children }: { children?: React.ReactNode }) => <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">{children}</code>,
                            pre: ({ children }: { children?: React.ReactNode }) => <pre className="overflow-x-auto rounded-lg bg-zinc-100 p-3 text-xs dark:bg-zinc-800">{children}</pre>,
                            a: ({ href, children }: { href?: string; children?: React.ReactNode }) => <a href={href} className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">{children}</a>,
                            blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote className="border-l-2 border-zinc-300 pl-3 italic dark:border-zinc-700">{children}</blockquote>,
                            img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
                              // Normalise image paths
                              const { src, alt, ...rest } = props;
                              let imageSrc = typeof src === "string" ? src : "";
                              if (imageSrc.startsWith("chronalog/")) {
                                imageSrc = `/${imageSrc}`;
                              } else if (!imageSrc.startsWith("/") && !imageSrc.startsWith("http")) {
                                imageSrc = `/${imageSrc}`;
                              }
                              return (
                                <img
                                  {...rest}
                                  src={imageSrc}
                                  alt={alt || ""}
                                  className="my-4 max-w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = "none";
                                  }}
                                />
                              );
                            },
                          }}
                        >
                          {entry.body}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
