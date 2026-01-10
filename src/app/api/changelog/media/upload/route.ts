import { NextResponse } from "next/server"
import { saveMediaFile, getLoginSession, getGitRemoteUrl, parseGitHubRepoFromUrl, getGitBranch } from "chronalog"

export async function POST(request: Request) {
  const session = await getLoginSession()
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      )
    }

    const remoteUrl = getGitRemoteUrl();
    const repoInfo = parseGitHubRepoFromUrl(remoteUrl);
    if (!repoInfo) {
      return NextResponse.json(
        { error: "Invalid Git remote URL" },
        { status: 400 }
      );
    }
    const branch = getGitBranch() || 'main';

    const uploadedFiles: Array<{ filename: string; url: string }> = []

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        continue
      }

      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      // Note: Media files are currently only supported via local filesystem
      // GitHub API support for media files may be added in the future
      const url = saveMediaFile(buffer, file.name)

      uploadedFiles.push({
        filename: file.name,
        url,
      })
    }

    if (uploadedFiles.length === 0) {
      return NextResponse.json(
        { error: "No valid image files were uploaded" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: `Successfully uploaded ${uploadedFiles.length} file(s)`,
        files: uploadedFiles,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error uploading media files:", error)
    return NextResponse.json(
      {
        error: "Failed to upload media files",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
