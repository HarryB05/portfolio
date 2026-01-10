import { NextResponse } from "next/server"

export async function GET() {
  const scopes = ['read:user', 'user:email', 'repo']

  const url = new URL('https://github.com/login/oauth/authorize')

  url.searchParams.append('client_id', process.env.CHRONALOG_GITHUB_ID ?? '')
  url.searchParams.append('scope', scopes.join(','))
  url.searchParams.append('response_type', 'code')
  if (process.env?.CHRONALOG_GITHUB_CALLBACK_URL) {
    url.searchParams.append('redirect_uri', process.env.CHRONALOG_GITHUB_CALLBACK_URL)
  }

  return NextResponse.json({ url: url.toString() })
}
