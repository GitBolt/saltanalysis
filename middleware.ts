import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const cleanSaltSegment = (segment: string): string => {
  let value = segment;
  try {
    value = decodeURIComponent(value);
  } catch {
    // keep
  }
  return value.replace(/[⁺⁻¹²³]/g, "");
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const match = pathname.match(/^\/salt\/([^/]+)\/(analysis|flow)\/?$/);
  if (!match) return NextResponse.next();

  const [, salt, page] = match;
  const cleaned = cleanSaltSegment(salt);
  if (cleaned === salt) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/salt/${cleaned}/${page}`;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: "/salt/:path*",
};
