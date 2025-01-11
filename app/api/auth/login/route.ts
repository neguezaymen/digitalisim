import db from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRATION = "7d";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;
  try {
    if (!email) {
      return new NextResponse("L'email est requis", { status: 400 });
    }
    if (!password) {
      return new NextResponse("Le mot de passe est requis", { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new NextResponse("Email ou mot de passe incorrect", {
        status: 401,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return new NextResponse("Email ou mot de passe incorrect", {
        status: 401,
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRATION,
      }
    );

    const response = new NextResponse(
      JSON.stringify({ message: "Connexion réussie" }),
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(String(error));
    }
    return new NextResponse("Erreur du serveur", { status: 500 });
  }
}
