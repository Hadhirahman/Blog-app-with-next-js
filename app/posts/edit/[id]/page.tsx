"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/apiFetch";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);


  useEffect(() => {
    apiFetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((post) => {
        setTitle(post.title);
        setContent(post.content);
        setLoading(false);
      })
      .catch((err) => {
        setToast({ type: "error", message: err.message || "Failed to load post" });
        setLoading(false);
        setTimeout(() => setToast(null), 3000);
      });
  }, [id]);

  const savePost = async () => {
    if (!title || !content) {
      setToast({ type: "error", message: "All fields required" });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    try {
      setSaving(true);

      await apiFetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
      });

      setToast({ type: "success", message: "Post updated" });

      setTimeout(() => {
        router.push(`/posts/${id}`);
      }, 1200);
    } catch (err: any) {
      setToast({ type: "error", message: err.message || "Update failed" });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (loading) return <div className="p-10">Loading…</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">

      {toast && (
        <div className="toast toast-center toast-top">
          <div
            className={`alert ${
              toast.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold">Edit Post</h1>

      <input
        className="input input-bordered w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="textarea textarea-bordered w-full"
        rows={8}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex gap-3">
        <button
          className="btn btn-primary"
          onClick={savePost}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        <button className="btn btn-outline" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </div>
  );
}
