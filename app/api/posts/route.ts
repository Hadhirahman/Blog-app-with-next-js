import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find().sort({ createdAt: -1 });
    return Response.json(posts);
  } catch (err) {
    return Response.json({ message: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

  
    let user: any;
    try {
      user = await verifyToken(token);
    } catch (err) {
      return Response.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    const body = await req.json();

   
    const post = await Post.create({
      title: body.title,
      content: body.content,
      author: user.id,
      authorName: user.name,
    });

    return Response.json(post, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error creating post" }, { status: 500 });
  }
}
