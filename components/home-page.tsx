"use client";
import { Company, Person } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

interface HomePageProps {
  companies: Company[];
  persones: Person[];
}
const HomePage = ({ companies, persones }: HomePageProps) => {
  const router = useRouter();
  const [companiesIsLoading, setCompaniesIsLoading] = useState(false);
  const [personsIsLoading, setPersonsIsLoading] = useState(false);
  const handleInitCompany = async () => {
    try {
      setCompaniesIsLoading(true);
      await axios.get("/api/companies/init");
    } finally {
      setCompaniesIsLoading(false);
      router.push("/companies");
    }
  };
  const handleInitPerson = async () => {
    try {
      setPersonsIsLoading(true);
      await axios.get("/api/persons/init");
    } finally {
      setPersonsIsLoading(false);
      router.push("/persons");
    }
  };
  return (
    <main className="flex flex-col items-center h-full gap-4 pt-[200px] bg-gray-100 ">
      <Image
        src={"/Logo.svg"}
        alt="logo"
        width={500}
        height={170}
        className="p-4 m-4 bg-black"
      />
      {(companies.length === 0 || persones.length === 0) && (
        <p className="text-lg text-muted-foreground">
          Initialisez les données pour commencer
        </p>
      )}
      <div className="flex gap-4">
        {companies.length === 0 && (
          <Button onClick={handleInitCompany} disabled={companiesIsLoading}>
            Initialiser les entreprises
            {companiesIsLoading && <Loader2 className="animate-spin" />}
          </Button>
        )}
        {persones.length === 0 && (
          <Button onClick={handleInitPerson} disabled={personsIsLoading}>
            Initialiser les personnes
            {personsIsLoading && <Loader2 className="animate-spin" />}
          </Button>
        )}
      </div>
    </main>
  );
};

export default HomePage;
