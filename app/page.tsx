import Link from "next/link";
import { apiFetch } from "@/lib/apiFetch";
import { formatDate } from "@/lib/formatDate";

export default async function Home() {
  let posts: any[] = [];

  try {
    const res = await apiFetch(`${process.env.API_URL}/api/posts`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to load posts");
    }

    posts = await res.json();
  } catch (err: any) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="alert alert-error shadow">
          <span>{err.message || "Unable to load blog posts"}</span>
        </div>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="alert alert-info">
          <span>No posts published yet.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl lg:mx-0">
      <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">From the blog</h2>
     
    </div>
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      
      {posts.map((p: any)=>
      <Link href={`/posts/${p._id}`} key={p._id} className="group relative flex flex-col bg-base-100 items-start p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
      <article key={p._id} className="flex max-w-xl flex-col items-start  justify-between">
        <div className="flex items-center gap-x-4 text-xs">
          <time className="text-xs text-gray-400">
                  {new Date(p.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
          </div>
        <div className="group relative grow">
          <h3 className="mt-3 text-lg/6 font-semibold text-white group-hover:text-gray-300">
            
              <span className="absolute inset-0"></span>
              {p.title}
          
          </h3>
          <p className="mt-5 line-clamp-3 text-sm/6 text-gray-400">{p.content}</p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-10 rounded-full bg-gray-800" />
          <div className="text-sm/6">
            <p className="font-semibold text-white">
             
                <span className="absolute inset-0"></span>
               {p.authorName}
              
            </p>
          
          </div>
        </div>
      </article>
    </Link>
      )}
    </div>
  </div>
</div>
  );
}
