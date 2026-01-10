import { NextRequest, NextResponse } from "next/server"
import { setLoginSession, getGitRemoteUrl } from "chronalog"
import { getAccessToken, fetchGitHubUser, checkRepository, checkCollaborator, parseGitHubRepoFromUrl } from "chronalog"

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const error = url.searchParams.get('error')

  // Handle GitHub errors
  if (error) {
    return NextResponse.redirect(
      new URL(`/chronalog?error=${error}`, request.url)
    )
  }

  const code = url.searchParams.get('code') as string | null
  if (!code) {
    return NextResponse.redirect(
      new URL('/chronalog?error=missing_code', request.url)
    )
  }

  try {
    const {
      access_token,
      refresh_token,
      expires_in,
      refresh_token_expires_in
    } = await getAccessToken({ code })

    if (!access_token) {
      return NextResponse.redirect(
        new URL('/chronalog?error=no_access_token', request.url)
      )
    }

    let userData = await fetchGitHubUser(access_token)
    
    // If email is missing, fetch from /user/emails
    if (!userData.email) {
      const emails = await (
        await fetch('https://api.github.com/user/emails', {
          headers: {
            Authorization: `token ${access_token}`
          }
        })
      ).json()

      if (Array.isArray(emails) && emails.length > 0) {
        const primary = emails.find((email: any) => email.primary)
        userData.email = primary ? primary.email : emails[0].email
      }
    }

    // Verify repository access
    const remoteUrl = getGitRemoteUrl()
    const repoInfo = parseGitHubRepoFromUrl(remoteUrl)
    
    if (repoInfo) {
      // Check if user has access to the repository
      const hasRepoAccess = await checkRepository(access_token, repoInfo.owner, repoInfo.name)
      
      if (!hasRepoAccess) {
        // If not the owner, check if they're a collaborator
        const isCollaborator = await checkCollaborator(access_token, repoInfo.owner, repoInfo.name, userData.login)
        
        if (!isCollaborator) {
          return NextResponse.redirect(
            new URL('/chronalog?error=access_denied', request.url)
          )
        }
      }
    }

    if (userData && userData.email && access_token) {
      const { name, login, email, avatar_url } = userData
      const sessionData = {
        user: { name: name || '', login, email, image: avatar_url },
        access_token,
        refresh_token,
        expires: new Date(Date.now() + expires_in),
        refresh_token_expires: refresh_token_expires_in
          ? new Date(Date.now() + refresh_token_expires_in)
          : undefined
      }
      await setLoginSession(sessionData)
      // Use absolute URL for redirect
      const origin = url.origin
      return NextResponse.redirect(new URL('/chronalog', origin))
    } else {
      return NextResponse.redirect(
        new URL('/chronalog?error=missing_user_data', request.url)
      )
    }
  } catch (err) {
    console.error('Auth callback error:', err)
    return NextResponse.redirect(
      new URL('/chronalog?error=auth_callback_failed', request.url)
    )
  }
}
