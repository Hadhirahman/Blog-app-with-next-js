import User from "@/models/User";
import jwt from "jsonwebtoken";
const secret = process.env.NEXTAUTH_SECRET;

if (!secret) {
  throw new Error("NEXTAUTH_SECRET is missing from .env");
}
export function signToken(payload: any) {
  return jwt.sign(payload, secret!, { expiresIn: "1d" });
}

export async function verifyToken(token: string) {
  try {
   
    const decoded: any = jwt.verify(token, secret!);

    const user = await User.findById(decoded.id)

    if (!user) return null;
    return {
      id: user._id,
      name: user.name,
      role: user.role,
    };
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
}