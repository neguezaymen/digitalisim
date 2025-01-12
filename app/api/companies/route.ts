import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, website } = body;
    if (!name || !email || !phone || !website) {
      return new NextResponse("Missing required fields", { status: 401 });
    }
    const company = await db.company.findFirst({
      where: {
        email,
      },
    });
    if (company) {
      return new NextResponse("Company already exists", { status: 401 });
    }
    await db.company.create({
      data: {
        name,
        email,
        phone,
        website,
      },
    });
    revalidatePath("/companies");
    return new NextResponse("Success", { status: 201 });
  } catch (error: unknown) {
    console.error("Error fetching or saving companies:", error);

    return new NextResponse("Server error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, name, email, phone, website } = body;
    if (!id || !name || !email || !phone || !website) {
      return new NextResponse("Missing required fields", { status: 401 });
    }
    await db.company.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        website,
      },
    });
    return new NextResponse("Success", { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching or saving companies:", error);

    return new NextResponse("Server error", { status: 500 });
  }
}
