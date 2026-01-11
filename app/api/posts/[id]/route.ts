import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; 
  console.log("API got id:", id);

  try {
    await dbConnect();
    const post = await Post.findById(id);

    if (!post) {
      return Response.json({ message: "Post not found" }, { status: 404 });
    }

    return Response.json(post);
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
      const token = (await cookies()).get("token")?.value;
    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = await verifyToken(token);
    console.log(user);
    
    if (!user) {
      return Response.json({ message: "Invalid token" }, { status: 401 });
    }
  
    await dbConnect();
    const post = await Post.findById({ _id: id });


    if (!post) {
      return Response.json({ message: "Post not found" }, { status: 404 });
    }
    const isAuthor = post.author.toString() === user.id.toString();
    const isAdmin = user.role === "admin";
    if (!isAuthor && !isAdmin) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }
    await Post.findByIdAndDelete(id)
    return Response.json({ message: "Post deleted" });
  } catch (err) {
    return Response.json({ message: "Failed to delete post" },{ status: 500 }
    );
  }
}





export async function PUT(req: Request,{ params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user) {
      return Response.json({ message: "Invalid token" }, { status: 401 });
    }

    const { title, content } = await req.json();
    if (!title || !content) {
      return Response.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const post = await Post.findById(id);
    if (!post) {
      return Response.json({ message: "Post not found" }, { status: 404 });
    }

    const isAuthor = post.author.toString() === user.id.toString();
    const isAdmin = user.role === "admin";

    if (!isAuthor && !isAdmin) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    post.title = title;
    post.content = content;
    await post.save();

    return Response.json({ message: "Post updated" });

  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Failed to update post" },
      { status: 500 }
    );
  }
}
