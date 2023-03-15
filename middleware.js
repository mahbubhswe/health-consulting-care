import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
export async function middleware(request) {
  const cookie = request.cookies.get("token");
  if (cookie == undefined) {
    if (request.nextUrl.pathname == "/dashboard") {
      return NextResponse.redirect(new URL("/auth/user/login", request.url));
    } else if (request.nextUrl.pathname == "/teacher-portal") {
      return NextResponse.redirect(new URL("/auth/teacher/login", request.url));
    } else {
      return NextResponse.redirect(new URL("/auth/student/login", request.url));
    }
  }
  const { payload } = await jwtVerify(
    cookie.value,
    new TextEncoder().encode(process.env.JWT_Secreet)
  );
  if (payload) {
    return NextResponse.next();
  } else {
    if (request.nextUrl.pathname == "/dashboard") {
      return NextResponse.redirect(new URL("/auth/user/login", request.url));
    } else if (request.nextUrl.pathname == "/teacher-portal") {
      return NextResponse.redirect(new URL("/auth/teacher/login", request.url));
    } else {
      return NextResponse.redirect(new URL("/auth/student/login", request.url));
    }
  }
}
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/student-portal/:path*",
    "/teacher-portal/:path*",
  ],
};
