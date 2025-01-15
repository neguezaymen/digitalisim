import { CompanyModal } from "@/components/company-modal";
import { filterAndSortCompanies } from "@/lib/utils";
import { Company } from "@prisma/client";
import AddCompanyButton from "./add-company-button";
import CompanyModalContent from "./company-modal-content";

interface CompaniesPageProps {
  initialCompanies: Company[];
  searchParams: { [key: string]: string | undefined };
}

export default async function CompaniesPage({
  initialCompanies,
  searchParams,
}: CompaniesPageProps) {
  const filteredCompanies = filterAndSortCompanies({
    initialCompanies,
    searchParams,
  });

  return (
    <div className="relative h-full">
      <AddCompanyButton />
      {filteredCompanies.length === 0 && (
        <p className="text-center text-muted-foreground">
          Aucune entreprise trouvée.
        </p>
      )}
      {filteredCompanies.length !== 0 && (
        <>
          <div className="flex justify-between items-center mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCompanies?.map((company) => (
              <CompanyModalContent company={company} key={company.id} />
            ))}
          </div>
        </>
      )}
      <CompanyModal />
    </div>
  );
}
