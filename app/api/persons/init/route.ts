import db from "@/lib/db";
import { Person } from "@prisma/client";
import axios from "axios";
import { NextResponse } from "next/server";
import { z } from "zod";

const PersonSchema = z.object({
  firstname: z.string(),
  email: z.string(),
  phone: z.string(),
  lastname: z.string(),
});

const personsSchema = z.array(PersonSchema);

export async function GET() {
  try {
    const response = await axios.get(
      "https://fakerapi.it/api/v2/persons?_quantity=4"
    );
    const persons: Person[] = response.data.data;
    if (!persons || persons.length === 0) {
      return new NextResponse("No companies retrieved", { status: 400 });
    }
    const parsedPersons = personsSchema.safeParse(persons);
    if (!parsedPersons.success) {
      return new NextResponse("Invalid company data", { status: 400 });
    }

    for (const person of parsedPersons.data) {
      await db.person.create({
        data: person,
      });
    }

    return new NextResponse("Success", { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      "Error fetching or saving companies:",
      error.message || error
    );

    return new NextResponse("Server error", { status: 500 });
  }
}
