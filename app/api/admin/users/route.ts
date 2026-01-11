import dbConnect  from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const token = (await cookies()).get("token")?.value;
  const user = token ? await verifyToken(token) : null;
  if (!user || user.role !== "admin") {
    return Response.json({ message: "Forbidden" }, { status: 403 });
  }
  try {
    await dbConnect();
    const users = await User.find().sort({ createdAt: -1 });
    return Response.json(users);
  } catch (err) {
    return Response.json({ message: "Failed to fetch users" }, { status: 500 });
  }
}