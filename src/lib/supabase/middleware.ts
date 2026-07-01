import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the Supabase auth session on each /admin request and gates access:
 * unauthenticated users are redirected to the login page. This is edge-level
 * defense-in-depth — RLS in the database is the real access control.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Supabase not configured yet — do not block the site. /admin pages still
  // render their own "not configured" guard server-side.
  if (!url || !anonKey) return response;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // IMPORTANT: getUser() re-validates the JWT with Supabase (not just reads the
  // cookie), so a tampered/expired token cannot pass this gate.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isLoginRoute = path === "/admin/login";

  if (!user && path.startsWith("/admin") && !isLoginRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin/login";
    redirectUrl.search = `?next=${encodeURIComponent(path)}`;
    return NextResponse.redirect(redirectUrl);
  }

  if (user && isLoginRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}
