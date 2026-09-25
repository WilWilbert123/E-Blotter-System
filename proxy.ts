import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth') || 
                      request.nextUrl.pathname === '/police/admin/login' || 
                      request.nextUrl.pathname === '/barangay/admin/login';
  
  if (!user && !isAuthRoute && !request.nextUrl.pathname.startsWith('/api/')) {
    // Redirect unauthenticated users to a generic landing or specific login
    // For now, redirect to the barangay login by default
    const url = request.nextUrl.clone();
    url.pathname = '/barangay/admin/login';
    return NextResponse.redirect(url);
  }

  // Basic tenant/role routing check
  if (user && !isAuthRoute) {
    // This is a superficial check; real auth is verified in Server Actions / API routes.
    const isPoliceRoute = request.nextUrl.pathname.startsWith('/police/admin');
    const isBarangayRoute = request.nextUrl.pathname.startsWith('/barangay/admin');

    // We fetch the profile securely in server components, not just middleware
    // Middleware is kept thin as requested.
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
