import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return new NextResponse("Missing required fields", { status: 401 });
    }
    await db.person.delete({
      where: { id: Number(id) },
    });
    return new NextResponse("Success", { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching or saving companies:", error);

    return new NextResponse("Server error", { status: 500 });
  }
}
