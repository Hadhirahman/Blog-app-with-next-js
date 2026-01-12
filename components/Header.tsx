import Link from "next/link";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let user: any = null;
  let isAdmin = false;

  if (token) {
    try {
      user = await verifyToken(token);
      isAdmin = user?.role === "admin";
    } catch {
      user = null;
    }
  }

  return (
    <header className="navbar bg-base-300 shadow-sm px-10">

      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Blog-App
        </Link>
      </div>


      <div className="flex items-center gap-3">
        {user && (
          <>
            <h2 className="font-semibold">{user.name}</h2>
            <div className="badge badge-primary">
              {isAdmin ? "admin" : "user"}
            </div>
          </>
        )}

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>

         <ul
  tabIndex={0}
  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
>
  {!user ? (
    <li>
      <Link href="/auth/login">Login</Link>
    </li>
  ) : (
    <>
      

      <li>
        <Link href="/posts/create">Create Post</Link>
      </li>

      <li>
        <Link href={`/posts/my-posts/${user.id}`}>My Posts</Link>
      </li>

      {isAdmin && (
        <>

          <li>
            <Link href="/admin/posts">Manage All Posts</Link>
          </li>

          <li>
            <Link href="/admin/users">User Management</Link>
          </li>
        </>
      )}

      <li className="mt-2">
        <form action="/api/auth/logout" method="POST">
          <button type="submit">Logout</button>
        </form>
      </li>
    </>
  )}
</ul>

        </div>
      </div>
    </header>
  );
}
