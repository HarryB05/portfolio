import { NextResponse } from "next/server"

export async function GET() {
  const missing: string[] = []
  
  if (!process.env.CHRONALOG_GITHUB_ID) {
    missing.push('CHRONALOG_GITHUB_ID')
  }
  
  if (!process.env.CHRONALOG_GITHUB_SECRET) {
    missing.push('CHRONALOG_GITHUB_SECRET')
  }
  
  // Check repository variables (only required in serverless without Git connection)
  const isServerless = process.env.VERCEL === '1' || process.env.CF_PAGES === '1' || process.env.AWS_LAMBDA_FUNCTION_NAME
  const hasVercelGitVars = process.env.VERCEL_GIT_REPO_URL || (process.env.VERCEL_GIT_REPO_OWNER && process.env.VERCEL_GIT_REPO_SLUG)
  
  if (isServerless && !hasVercelGitVars) {
    if (!process.env.CHRONALOG_REPO_OWNER) {
      missing.push('CHRONALOG_REPO_OWNER')
    }
    if (!process.env.CHRONALOG_REPO_SLUG) {
      missing.push('CHRONALOG_REPO_SLUG')
    }
  }

  return NextResponse.json({
    configured: missing.length === 0,
    missing: missing.length > 0 ? missing : undefined,
    note: isServerless && !hasVercelGitVars 
      ? 'In serverless environments without Git connection, CHRONALOG_REPO_OWNER and CHRONALOG_REPO_SLUG are required'
      : undefined
  })
}
