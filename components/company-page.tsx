"use client";

import { CompanyModal } from "@/components/company-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Company } from "@prisma/client";
import axios from "axios";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface CompaniesPageProps {
  initialCompanies: Company[];
}

export function CompaniesPage({ initialCompanies }: CompaniesPageProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const handleViewCompany = (company: Company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };
  const handleAddCompany = () => {
    setSelectedCompany(null);
    setIsModalOpen(true);
  };

  const handleSaveCompany = async (updatedCompany: Company) => {
    try {
      if (selectedCompany) {
        await axios.patch("/api/companies", updatedCompany);
      } else {
        await axios.post("/api/companies", updatedCompany);
      }

      window.location.reload();
      setIsModalOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data || "An error occurred");
      } else {
        setError("An error occurred");
      }
    }
  };

  const handleDeleteCompany = async (id: number) => {
    try {
      await axios.delete(`/api/companies/${id}`);
      window.location.reload();
      setIsModalOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data || "An error occurred");
      } else {
        setError("An error occurred");
      }
    }
  };
  const filterAndSortCompanies = () => {
    const searchTerm = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "";

    let filteredCompanies = initialCompanies;

    if (searchTerm) {
      filteredCompanies = filteredCompanies?.filter((company) =>
        [company.name, company.email].some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    if (sortBy) {
      filteredCompanies?.sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "email") return a.email.localeCompare(b.email);
        return 0;
      });
    }

    return filteredCompanies;
  };

  const renderCompanies = () => {
    const filteredCompanies = filterAndSortCompanies();
    return filteredCompanies?.map((company) => (
      <Card
        key={company.id}
        className="bg-white cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => handleViewCompany(company)}
      >
        <CardHeader>
          <CardTitle>{company.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{company.email}</p>
          <p className="text-sm text-muted-foreground">{company.phone}</p>
        </CardContent>
      </Card>
    ));
  };

  return (
    <div className="relative h-full">
      <Button onClick={handleAddCompany}>
        <Plus className="mr-2 h-4 w-4" /> Ajouter une entreprise
      </Button>
      {renderCompanies().length === 0 && (
        <p className="text-center text-muted-foreground">
          Aucune entreprise trouvée.
        </p>
      )}
      {renderCompanies().length !== 0 && (
        <>
          <div className="flex justify-between items-center mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {renderCompanies()}
          </div>
        </>
      )}
      <CompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        company={selectedCompany}
        onSave={handleSaveCompany}
        onDelete={handleDeleteCompany}
        error={error}
      />
    </div>
  );
}
