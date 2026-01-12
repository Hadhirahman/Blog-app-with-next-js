import { cookies } from "next/headers";

export default async function proxy(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  const token = (await cookies()).get("token")?.value;

  // Block auth pages for logged-in users
  if (token && pathname.startsWith("/auth")) {
    if (!pathname.startsWith("/auth/logout")) {
      return Response.redirect(new URL("/", req.url));
    }
  }

  // Protected routes
  const protectedRoutes = [
    "/posts/create",
    "/posts/my-posts",
    "/posts/edit",
    "/admin/posts",
    "/admin/users",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!token && isProtected) {
    return Response.redirect(new URL("/auth/login", req.url));
  }

  return;
}
