import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  await dbConnect();

  const { email, password } = await req.json();
  const user: any = await User.findOne({ email });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return Response.json({ message: "Invalid" }, { status: 401 });

  const token = signToken({ id: user._id, role: user.role });

  (await cookies()).set("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
});


  return Response.json({ message: "Logged in" });
}
