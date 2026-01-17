import { NextResponse } from "next/server";
import { listChangelogEntries, getLoginSession, getGitRemoteUrl, getGitBranch } from "chronalog";

// Cache for 5 minutes, revalidate on demand
export const revalidate = 300;

export async function GET() {
  try {
    // Get session for access token (optional for public repos)
    // This route is public - no auth required for reading changelog entries
    const session = await getLoginSession();
    const remoteUrl = getGitRemoteUrl();
    const branch = getGitBranch() || 'main';

    // Token priority: 1. User session token, 2. CHRONALOG_GITHUB_TOKEN env var, 3. No token (public repos)
    const accessToken = session?.access_token || process.env.CHRONALOG_GITHUB_TOKEN || undefined;

    // List changelog entries (uses GitHub API in serverless, filesystem in dev)
    // Uses batch fetching with GraphQL when token is available, parallel fetching otherwise
    const entries = await listChangelogEntries(undefined, {
      accessToken,
      remoteUrl,
      branch,
    });

    return NextResponse.json(
      {
        success: true,
        entries,
      },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error("Error listing changelog entries:", error);
    return NextResponse.json(
      {
        error: "Failed to list changelog entries",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
