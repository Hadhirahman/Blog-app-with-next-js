import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    authorName: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
