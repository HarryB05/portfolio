import { NextResponse } from "next/server";
import { listChangelogEntries, getLoginSession, getGitRemoteUrl, getGitBranch } from "chronalog";

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
    // For public repos, we can try without access token
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
      { status: 200 }
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
