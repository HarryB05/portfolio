import { NextResponse } from "next/server"
import { readPredefinedTags, savePredefinedTags, readPredefinedTagsViaGitHub, savePredefinedTagsViaGitHub, getLoginSession, getGitRemoteUrl, getGitBranch } from "chronalog"

export async function GET() {
  const session = await getLoginSession()
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  try {
    const remoteUrl = getGitRemoteUrl();
    const branch = getGitBranch() || 'main';
    
    // Token priority: 1. User session token, 2. CHRONALOG_GITHUB_TOKEN env var
    const accessToken = session.access_token || process.env.CHRONALOG_GITHUB_TOKEN;
    
    // Use GitHub API in serverless environments, otherwise use local filesystem
    const isServerless = process.env.VERCEL === '1' || process.env.CF_PAGES === '1' || process.env.AWS_LAMBDA_FUNCTION_NAME;
    let tags;
    
    if (isServerless && accessToken && remoteUrl) {
      tags = await readPredefinedTagsViaGitHub(accessToken, remoteUrl, 'chronalog', branch);
    } else {
      tags = readPredefinedTags();
    }
    
    return NextResponse.json(
      {
        success: true,
        tags,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error reading predefined tags:", error)
    return NextResponse.json(
      {
        error: "Failed to read predefined tags",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

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
    const { tags } = body

    if (!Array.isArray(tags)) {
      return NextResponse.json(
        { error: "Tags must be an array" },
        { status: 400 }
      )
    }

    const remoteUrl = getGitRemoteUrl();
    const branch = getGitBranch() || 'main';
    
    // Token priority: 1. User session token, 2. CHRONALOG_GITHUB_TOKEN env var
    const accessToken = session.access_token || process.env.CHRONALOG_GITHUB_TOKEN;
    
    // Use GitHub API in serverless environments, otherwise use local filesystem
    const isServerless = process.env.VERCEL === '1' || process.env.CF_PAGES === '1' || process.env.AWS_LAMBDA_FUNCTION_NAME;
    let result;
    
    if (isServerless && accessToken && remoteUrl) {
      result = await savePredefinedTagsViaGitHub(tags, accessToken, remoteUrl, 'chronalog', branch);
    } else {
      result = savePredefinedTags(tags);
    }

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Failed to save predefined tags",
          details: result.error || "Unknown error",
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Tags saved successfully",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error saving predefined tags:", error)
    return NextResponse.json(
      {
        error: "Failed to save predefined tags",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
