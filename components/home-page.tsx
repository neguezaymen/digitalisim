"use client";
import { Company, Person } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface HomePageProps {
  companies: Company[];
  persones: Person[];
}
const HomePage = ({ companies, persones }: HomePageProps) => {
  const router = useRouter();
  const handleInitCompany = async () => {
    await axios.get("/api/companies/init");
    router.push("/companies");
  };
  const handleInitPerson = async () => {
    await axios.get("/api/persons/init");
    router.push("/persons");
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
          <Button onClick={handleInitCompany}>
            Initialiser les entreprises
          </Button>
        )}
        {persones.length === 0 && (
          <Button onClick={handleInitPerson}>Initialiser les personnes</Button>
        )}
      </div>
    </main>
  );
};

export default HomePage;
