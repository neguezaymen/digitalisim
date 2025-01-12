import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(req: Request, { params }: any) {
  try {
    const { id } = params;
    if (!id) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    await db.person.delete({
      where: { id: Number(id) },
    });
    revalidatePath("/persons");
    return new NextResponse("Success", { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching or saving companies:", error);

    return new NextResponse("Server error", { status: 500 });
  }
}
