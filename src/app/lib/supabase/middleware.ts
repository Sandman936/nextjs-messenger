/** biome-ignore-all lint/style/noNonNullAssertion: Базовая структура middleware в supabase*/
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { OTHER_ROUTES, USER_ROUTES } from "@/app/constants/routes";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_MESSENGER_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_MESSENGER_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.map(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.map(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: Don't remove getClaims()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !request.nextUrl.pathname.startsWith(OTHER_ROUTES.LOGIN_PAGE)) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = OTHER_ROUTES.LOGIN_PAGE;
    console.log("Пользователь не авторизован, перенаправление на /login");
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  if (user) {
    const hasName =
      user.user_metadata?.has_set_name === true &&
      user.user_metadata?.first_name;

    if (
      !hasName &&
      !request.nextUrl.pathname.startsWith(OTHER_ROUTES.LOGIN_PAGE)
    ) {
      const url = request.nextUrl.clone();
      url.pathname = OTHER_ROUTES.LOGIN_PAGE;
      return NextResponse.redirect(url);
    }

    if (
      hasName &&
      request.nextUrl.pathname.startsWith(OTHER_ROUTES.LOGIN_PAGE)
    ) {
      const url = request.nextUrl.clone();
      url.pathname = USER_ROUTES.MAIN_PAGE;
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
