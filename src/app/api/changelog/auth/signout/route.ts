import { NextRequest, NextResponse } from "next/server"
import { clearLoginSession } from "chronalog"

export async function GET(req: NextRequest) {
  await clearLoginSession()

  const homeUrl = new URL('/', req.url)
  return NextResponse.redirect(homeUrl)
}
