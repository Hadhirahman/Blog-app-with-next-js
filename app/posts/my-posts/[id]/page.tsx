import DeletePostButton from "@/components/DeletePostButton";
import { apiFetch } from "@/lib/apiFetch";
import Link from "next/link";

export default async function PostsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let posts: any[] = [];

  try {
    const res = await apiFetch(
      `${process.env.API_URL}/api/posts/my-post/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to load posts");
    }

    posts = await res.json();
  } catch (error: any) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center">
        <div className="alert alert-error shadow">
          <span>{error.message || "Unable to load posts"}</span>
        </div>

        <Link href="/" className="btn btn-link mt-4">
          Go Home
        </Link>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center">
        <div className="alert alert-info">
          <span>You have not created any posts yet.</span>
        </div>

        <Link href="/posts/create" className="btn btn-primary mt-4">
          Create your first post
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Posts</h1>

      {posts.map((p: any) => (
        <div
          key={p._id}
          className="card bg-base-100 shadow-md hover:shadow-lg transition p-5"
        >
          <div className="flex justify-between items-start gap-6">
            <div className="flex-1 space-y-2">
              <Link href={`/posts/${p._id}`}>
                <h3 className="text-lg font-semibold hover:underline">
                  {p.title}
                </h3>
              </Link>

              <p className="text-sm opacity-70 line-clamp-2">
                {p.content}
              </p>

              <div className="text-xs opacity-50">
                By {p.authorName}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link
                href={`/posts/edit/${p._id}`}
                className="btn btn-sm btn-outline btn-primary"
              >
                Edit
              </Link>

              <DeletePostButton postId={p._id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
