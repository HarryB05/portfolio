import { NextResponse } from "next/server";
import { saveChangelogEntry, getLoginSession, getGitRemoteUrl, getGitBranch } from "chronalog";
import type { SaveChangelogRequest } from "chronalog";

export async function POST(request: Request) {
  // Check authentication
  const session = await getLoginSession();
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body: SaveChangelogRequest = await request.json();

    // Validate required fields
    if (!body.title || !body.body) {
      return NextResponse.json(
        { error: "Title and body are required" },
        { status: 400 }
      );
    }

    // Validate version is provided (required for file naming)
    if (!body.version || !body.version.trim()) {
      return NextResponse.json(
        { error: "Version is required for changelog entries" },
        { status: 400 }
      );
    }

    const remoteUrl = getGitRemoteUrl();
    const branch = getGitBranch() || 'main';

    // Save the changelog entry (uses GitHub API in serverless, filesystem in dev)
    const result = await saveChangelogEntry(body, undefined, undefined, {
      accessToken: session.access_token,
      remoteUrl,
      branch,
    });

    // Prepare response
    const response: {
      success: boolean;
      message: string;
      path: string;
      gitCommit?: {
        success: boolean;
        error?: string;
      };
    } = {
      success: true,
      message: "Changelog entry saved successfully",
      path: result.filePath || 'saved',
    };

    // Include Git commit status if available
    if (result.gitCommit) {
      response.gitCommit = result.gitCommit;

      // If Git commit failed, log warning but don't fail the request
      // The file was still saved successfully
      if (!result.gitCommit.success) {
        console.warn("Changelog entry saved but Git commit failed:", result.gitCommit.error);
      }
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error saving changelog entry:", error);
    return NextResponse.json(
      {
        error: "Failed to save changelog entry",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
