import { NextResponse } from "next/server"
import { getLoginSession } from "chronalog"
import fs from "fs"
import path from "path"

export async function POST(request: Request) {
  const session = await getLoginSession()
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { filename } = body

    if (!filename || typeof filename !== "string") {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      )
    }

    const sanitizedFilename = filename
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .replace(/^-+|-+$/g, "")

    const mediaDir = path.join(process.cwd(), "public", "chronalog")
    const filePath = path.join(mediaDir, sanitizedFilename)

    if (!filePath.startsWith(mediaDir)) {
      return NextResponse.json(
        { error: "Invalid file path" },
        { status: 400 }
      )
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      )
    }

    fs.unlinkSync(filePath)

    return NextResponse.json(
      {
        success: true,
        message: "File deleted successfully",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting media file:", error)
    return NextResponse.json(
      {
        error: "Failed to delete media file",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
