import { Company, Person } from "@prisma/client";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data ||
      "Une erreur est survenue lors de la communication avec le serveur."
    );
  }
  return "Une erreur inconnue s'est produite.";
};

export const filterAndSortCompanies = ({
  initialCompanies,
  searchParams,
}: {
  initialCompanies: Company[];
  searchParams: { [key: string]: string | undefined };
}) => {
  const searchTerm = searchParams?.search || "";
  const sortBy = searchParams?.sortBy || "";

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

export const filterAndSortPersons = ({
  initialPersons,
  searchParams,
}: {
  initialPersons: Person[];
  searchParams: { [key: string]: string | undefined };
}) => {
  const searchTerm = searchParams?.search || "";
  const sortBy = searchParams?.sortBy || "";

  let filteredPersons = initialPersons;

  if (searchTerm) {
    filteredPersons = filteredPersons.filter((person) =>
      [person.firstname, person.lastname, person.email].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  filteredPersons.sort((a, b) => {
    if (sortBy === "name") return a.lastname.localeCompare(b.lastname);
    if (sortBy === "email") return a.email.localeCompare(b.email);
    return 0;
  });

  return filteredPersons;
};
