import { NextResponse } from "next/server";
import { listChangelogEntries, getLoginSession, getGitRemoteUrl, getGitBranch } from "chronalog";

export async function GET() {
  try {
    // Get session for access token (optional for public repos)
    const session = await getLoginSession();
    const remoteUrl = getGitRemoteUrl();
    const branch = getGitBranch() || 'main';

    // Token priority: 1. User session token, 2. CHRONALOG_GITHUB_TOKEN env var, 3. No token (public repos)
    const accessToken = session?.access_token || process.env.CHRONALOG_GITHUB_TOKEN || undefined;

    const entries = await listChangelogEntries(undefined, {
      accessToken,
      remoteUrl,
      branch,
    });

    // Return the latest entry (first in the sorted list)
    const latestEntry = entries.length > 0 ? entries[0] : null;

    return NextResponse.json(
      {
        success: true,
        entry: latestEntry,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching latest changelog entry:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch latest changelog entry",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
