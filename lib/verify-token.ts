import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface User {
  id: string;
  email: string;
  name: string;
}

export const verifyToken = async (): Promise<User | null> => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = (await cookies()).get("token")?.value;

  if (!token || !JWT_SECRET) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as User;
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
