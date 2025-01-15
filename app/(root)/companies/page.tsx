import CompaniesPage from "@/components/company-page";
import db from "@/lib/db";

export default async function CompaniesServerPage({
  searchParams,
}: {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const dbCompanies = await db.company.findMany();
  const sParams = await searchParams;

  return (
    <div>
      <CompaniesPage initialCompanies={dbCompanies} searchParams={sParams} />
    </div>
  );
}
