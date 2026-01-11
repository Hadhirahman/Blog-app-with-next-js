import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const {id}=await params;
    console.log("API params:", id);

  try {
    await dbConnect();

    const posts = await Post.find({ author: id }).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
