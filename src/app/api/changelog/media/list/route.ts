import { NextResponse } from "next/server"
import { listMediaFiles, getLoginSession, getGitRemoteUrl, parseGitHubRepoFromUrl, getGitBranch } from "chronalog"

export async function GET() {
  const session = await getLoginSession()
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  try {
    // Note: Media files are currently only supported via local filesystem
    // GitHub API support for media files may be added in the future
    const files = listMediaFiles();
    
    const formattedFiles = files.map((file) => ({
      filename: file.filename,
      url: file.url,
      size: file.size,
      modified: file.modified ? file.modified.toISOString() : new Date().toISOString(),
    }))

    return NextResponse.json(
      {
        success: true,
        files: formattedFiles,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error listing media files:", error)
    return NextResponse.json(
      {
        error: "Failed to list media files",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
