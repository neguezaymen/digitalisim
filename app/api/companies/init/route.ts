import db from "@/lib/db";
import { Company } from "@prisma/client";
import axios from "axios";
import { NextResponse } from "next/server";
import { z } from "zod";

const CompanySchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  website: z.string(),
});

const companiesSchema = z.array(CompanySchema);

export async function GET() {
  try {
    const response = await axios.get(
      "https://fakerapi.it/api/v2/companies?_quantity=4"
    );
    const companies: Company[] = response.data.data;
    if (!companies || companies.length === 0) {
      return new NextResponse("No companies retrieved", { status: 400 });
    }
    const parsedCompanies = companiesSchema.safeParse(companies);
    if (!parsedCompanies.success) {
      return new NextResponse("Invalid company data", { status: 400 });
    }

    for (const company of parsedCompanies.data) {
      await db.company.create({
        data: company,
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
