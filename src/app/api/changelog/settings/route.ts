import { NextResponse } from "next/server"
import { getGitRemoteUrl, getGitBranch, isGitRepository, isGitInstalled } from "chronalog"
import { loadChronalogConfig } from "chronalog"

export async function GET() {
  try {
    const config = loadChronalogConfig()
    const remoteUrl = getGitRemoteUrl()
    const branch = getGitBranch()
    const isRepo = isGitRepository()
    const gitInstalled = isGitInstalled()

    // Check environment variables
    const envVars = {
      CHRONALOG_GITHUB_ID: !!process.env.CHRONALOG_GITHUB_ID,
      CHRONALOG_GITHUB_SECRET: !!process.env.CHRONALOG_GITHUB_SECRET,
      CHRONALOG_REPO_OWNER: !!process.env.CHRONALOG_REPO_OWNER,
      CHRONALOG_REPO_SLUG: !!process.env.CHRONALOG_REPO_SLUG,
      CHRONALOG_REPO_BRANCH: !!process.env.CHRONALOG_REPO_BRANCH,
    }
    const allEnvVarsSet = envVars.CHRONALOG_GITHUB_ID && envVars.CHRONALOG_GITHUB_SECRET

    return NextResponse.json(
      {
        success: true,
        info: {
          remoteUrl,
          branch,
          isGitRepository: isRepo,
          isGitInstalled: gitInstalled,
          changelogDir: config.changelogDir,
          envVars: {
            configured: allEnvVarsSet,
            ...envVars,
          },
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching repository info:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch repository information",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
