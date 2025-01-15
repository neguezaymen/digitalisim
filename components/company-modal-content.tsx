"use client";
import { useCompanyModal } from "@/hooks/useCompanyModal";
import { Company } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CompanyModalContentProps {
  company: Company;
}
const CompanyModalContent = ({ company }: CompanyModalContentProps) => {
  const { onOpen } = useCompanyModal();

  return (
    <Card
      key={company.id}
      className="bg-white cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onOpen(company)}
    >
      <CardHeader>
        <CardTitle>{company.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{company.email}</p>
        <p className="text-sm text-muted-foreground">{company.phone}</p>
      </CardContent>
    </Card>
  );
};

export default CompanyModalContent;
