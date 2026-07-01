import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

// Scope to /admin only — marketing pages stay fully static and untouched.
export const config = {
  matcher: ["/admin/:path*"],
};
