import { NextResponse } from "next/server"
import { loadChronalogConfig, saveHomeUrl, saveHomeUrlViaGitHub, readHomeUrlViaGitHub, getLoginSession, getGitRemoteUrl, getGitBranch } from "chronalog"

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
    let homeUrl = "/";
    
    if (isServerless && accessToken && remoteUrl) {
      homeUrl = await readHomeUrlViaGitHub(accessToken, remoteUrl, 'chronalog', branch) || "/";
    } else {
      const config = loadChronalogConfig();
      homeUrl = config.homeUrl || "/";
    }
    
    return NextResponse.json(
      {
        success: true,
        homeUrl,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error reading home URL:", error)
    return NextResponse.json(
      {
        error: "Failed to read home URL",
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
    const { homeUrl } = body

    if (typeof homeUrl !== "string") {
      return NextResponse.json(
        { error: "Home URL must be a string" },
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
      result = await saveHomeUrlViaGitHub(homeUrl, accessToken, remoteUrl, 'chronalog', branch);
    } else {
      result = saveHomeUrl(homeUrl);
    }

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Failed to save home URL",
          details: result.error || "Unknown error",
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Home URL saved successfully",
        homeUrl,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error saving home URL:", error)
    return NextResponse.json(
      {
        error: "Failed to save home URL",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
