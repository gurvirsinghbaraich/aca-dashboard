import { sidebarLinks } from "@/routes";
import { SessionCookie } from "@/interface";
import { NextRequest, NextResponse } from "next/server";
import { getRoleFromPath, sanitizeRole } from "@/roles";
import { getSession, encryptSession, cookieExpiresIn } from "@/auth";

export async function middleware(request: NextRequest) {
  try {
    const session = await getSession<SessionCookie>();
    const { pathname } = request.nextUrl;

    if (!session) {
      return NextResponse.next({
        headers: {
          "Request-Url": request.nextUrl.toString(),
        },
      });
    }

    if (/^\/dashboard\/*/.test(pathname)) {
      const role = getRoleFromPath(pathname);

      if (role) {
        const paths = sidebarLinks[role];

        if (paths) {
          for (let i = 0; i < paths.length; i++) {
            if (paths[i].path === pathname) {
              // Check if the user has permission to access this page
              if (!paths[i].canView(sanitizeRole(session.user.role))) {
                const response = new NextResponse(
                  "<script>window.location.href = '/';</script>",
                );

                response.headers.set("Content-Type", "text/html");
                return response;
              }
            }
          }
        }
      }
    }

    // Extending the duration of the session
    session.expires = new Date(Date.now() + cookieExpiresIn);

    // Updating the value of the cookie
    const response = NextResponse.next();

    response.cookies.set({
      httpOnly: true,
      name: "session",
      expires: session.expires,
      value: await encryptSession(session),
    });

    return response;
  } catch (error: any) {
    // Logout the user!

    const response = NextResponse.next();
    response.cookies.set({
      httpOnly: true,
      name: "session",
      expires: new Date(0),
      value: "",
    });
    return response;
  }
}
