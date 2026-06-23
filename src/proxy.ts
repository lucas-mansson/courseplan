import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server"
import { decrypt } from "./lib/session";

const protectedRoutes = [
  "/"
]

const unauthenticatedRoutes = [
  "/sign-in",
  "/sign-up",
]

export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path)
  const isUnauthenticatedRoute = unauthenticatedRoutes.includes(path)

  const cookie = (await cookies()).get("session")?.value
  const session = await decrypt(cookie)

  const isValidSession = !!session?.userId

  if (isProtectedRoute && !isValidSession) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl))
  }

  if (
    isUnauthenticatedRoute &&
    isValidSession &&
    !request.nextUrl.pathname.startsWith("/")
  ) {
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }
  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
