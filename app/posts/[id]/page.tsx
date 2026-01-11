import { formatDate } from "@/lib/formatDate";
import { apiFetch } from "@/lib/apiFetch";

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await apiFetch(`${process.env.API_URL}/api/posts/${id}`, {
    cache: "no-store",
  });

  const post = await res.json();
  const { text } = formatDate(post.createdAt);

  return (
    <div className="min-h-screen bg-base-200 flex justify-center px-4 py-12">
      <article className="bg-base-100 w-full max-w-3xl rounded-2xl shadow-xl p-8 md:p-12">

        <h1 className="text-3xl font-bold leading-tight mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-sm opacity-60 mb-8">
          <span>By {post.authorName}</span>
          <span>•</span>
          <time>{text}</time>
        </div>

        <div className="prose max-w-none text-base leading-relaxed">
          {post.content.split("\n").map((line: string, i: number) => (
            <p key={i}>{line}</p>
          ))}
        </div>

      </article>
    </div>
  );
}
