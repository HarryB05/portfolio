import { NextResponse } from "next/server"
import { getGitCommitHistory, getGitCommitHistoryViaGitHub, getLoginSession, getGitRemoteUrl, getGitBranch } from "chronalog"

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
    
    // Use GitHub API in serverless environments, otherwise use local Git
    const isServerless = process.env.VERCEL === '1' || process.env.CF_PAGES === '1' || process.env.AWS_LAMBDA_FUNCTION_NAME;
    let commits;
    
    if (isServerless && accessToken && remoteUrl) {
      commits = await getGitCommitHistoryViaGitHub(accessToken, remoteUrl, 50, branch);
    } else {
      commits = await getGitCommitHistory(50);
    }
    
    const formattedCommits = commits.map((commit) => ({
      hash: commit.hash,
      shortHash: commit.hash.substring(0, 7),
      message: commit.message,
      author: commit.author,
      date: commit.date,
    }))

    return NextResponse.json(
      {
        success: true,
        commits: formattedCommits,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching git commits:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch git commits",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
