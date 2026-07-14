import type { NextRequest } from "next/server";

// Next.js 16 request interceptor (formerly middleware.ts).
// TODO (PRD 7.1): refresh the Supabase session and protect the (dashboard)
// route group — redirect unauthenticated users to /login.
// Session-refresh helper lives in src/lib/supabase/proxy.ts.
export function proxy() {
  // TODO
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
