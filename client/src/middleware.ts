// export { auth as middleware } from "@/auth";

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|cart|[a-f0-9]{24}$).*)",
//   ],
// };

export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/dashboard/:path*"],
};
