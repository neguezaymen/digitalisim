import { CompaniesPage } from "@/components/company-page";
import db from "@/lib/db";

export default async function CompaniesServerPage() {
  const dbCompanies = await db.company.findMany();

  return (
    <div>
      <CompaniesPage initialCompanies={dbCompanies} />
    </div>
  );
}
