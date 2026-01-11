"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiFetch } from "@/lib/apiFetch";

export default function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);

  async function handleDelete() {
    const confirmed = confirm("confirm delete this post?");
    if (!confirmed) return;

    try {
      setLoading(true);

      await apiFetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      setToast({ type: "success", message: "Post deleted" });

      setTimeout(() => router.refresh(), 800);
    } catch (err: any) {
      setToast({
        type: "error",
        message: err.message || "Delete failed",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 3000);
    }
  }

  return (
    <>
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

      <button
        onClick={handleDelete}
        className="btn btn-sm btn-error"
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
    </>
  );
}
