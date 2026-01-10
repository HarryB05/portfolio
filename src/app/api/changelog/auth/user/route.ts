import { NextResponse } from "next/server"
import { getLoginSession } from "chronalog"

export async function GET() {
  try {
    const session = await getLoginSession()
    return NextResponse.json({ session })
  } catch (error) {
    return NextResponse.json({ error })
  }
}
