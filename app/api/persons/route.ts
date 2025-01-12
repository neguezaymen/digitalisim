import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstname, lastname, email, phone } = body;
    if (!firstname || !email || !phone || !lastname) {
      return new NextResponse("Missing required fields", { status: 401 });
    }
    const person = await db.person.findFirst({
      where: {
        email,
      },
    });
    if (person) {
      return new NextResponse("Person already exists", { status: 401 });
    }
    await db.person.create({
      data: {
        firstname,
        lastname,
        email,
        phone,
      },
    });
    revalidatePath("/persons");
    return new NextResponse("Success", { status: 201 });
  } catch (error: unknown) {
    console.error("Error fetching or saving companies:", error);

    return new NextResponse("Server error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, firstname, lastname, email, phone } = body;
    if (!id || !firstname || !email || !phone || !lastname) {
      return new NextResponse("Missing required fields", { status: 401 });
    }
    await db.person.update({
      where: { id },
      data: {
        firstname,
        email,
        phone,
        lastname,
      },
    });
    return new NextResponse("Success", { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching or saving companies:", error);

    return new NextResponse("Server error", { status: 500 });
  }
}
