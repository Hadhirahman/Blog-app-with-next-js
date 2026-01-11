"use client";

import { apiFetch } from "@/lib/apiFetch";
import { useState } from "react";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);

  const submitPost = async () => {
    if (!title || !content) {
      setToast({ type: "error", message: "Title and content are required." });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    try {
      setLoading(true);

      const res = await apiFetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) throw new Error("Failed");

      setTitle("");
      setContent("");

      setToast({ type: "success", message: "Post created successfully!" });
    } catch {
      setToast({ type: "error", message: "Something went wrong." });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="max-w-xl space-y-4 relative">

    
      {toast && (
        <div className="toast toast-top toast-center">
          <div
            className={`alert ${
              toast.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold">Create Post</h2>

      <input
        className="input input-bordered w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="textarea textarea-bordered w-full"
        rows={6}
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={submitPost}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </div>
  );
}
