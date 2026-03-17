import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { origin } = new URL(request.url)
  
  // Custom verification logic would go here
  // For now, redirect to login with verification status
  return NextResponse.redirect(`${origin}/login?verified=true`)
}
