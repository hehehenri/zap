import { NextResponse, type NextRequest } from "next/server";

const guess = ["/login", "/register", "/", "/_next", "/api", "/favicon.ico"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const headers = new Headers(request.headers);

  if (
    !guess.includes(request.nextUrl.pathname) &&
    !token
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url),
      { headers }
    );
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico).*)",
  ],
};
