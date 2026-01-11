import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  await dbConnect();

  const data = await req.json();

  const user = await User.create(data);

  return Response.json({ message: "Registered", user });
}
