import db from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRATION = "7d";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, name } = body;

  try {
    if (!email) {
      return new NextResponse("L'email est requis", { status: 400 });
    }
    if (!password) {
      return new NextResponse("Le mot de passe est requis", { status: 400 });
    }
    if (!name) {
      return new NextResponse("Le nom est requis", { status: 400 });
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse("L'utilisateur existe déjà", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: { email, password: hashedPassword, name },
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, name: newUser.name },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    const response = new NextResponse(
      JSON.stringify({ message: "Utilisateur créé avec succès" }),
      { status: 201 }
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
    console.log(error);
    return new NextResponse("Erreur du serveur", { status: 500 });
  }
}
