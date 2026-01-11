import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please add MONGODB_URI");
}

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log(" MongoDB connected successfully (Atlas)");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default dbConnect;
