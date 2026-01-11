import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export default async function AdminUsersPage() {
  const token = (await cookies()).get("token")?.value;
  const user = token ? await verifyToken(token) : null;

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Access denied
      </div>
    );
  }

  const res = await fetch(`${process.env.API_URL}/api/admin/users`, {
    cache: "no-store",
    headers: {
      Cookie: `token=${token}`,
    },
  });

  const data = await res.json();

  // If API returned error
  if (!Array.isArray(data)) {
    return (
      <div className="p-10 text-red-500">
        {data.message || "Failed to load users"}
      </div>
    );
  }

  const users = data;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      {users.map((u: any) => (
        <div key={u._id} className="card bg-base-100 p-4 mb-3 shadow">
          <div className="flex justify-between">
            <span>{u.name}</span>
            <span className="badge">{u.role}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
