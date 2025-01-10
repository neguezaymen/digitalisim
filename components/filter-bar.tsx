"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface FilterBarProps {
  entityType: "companies" | "persons";
}

export function FilterBar({ entityType }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (
      debouncedSearchTerm !== searchParams.get("search") ||
      sortBy !== searchParams.get("sortBy")
    ) {
      const params = new URLSearchParams(searchParams);
      if (debouncedSearchTerm) {
        params.set("search", debouncedSearchTerm);
      } else {
        params.delete("search");
      }
      if (sortBy !== "name") {
        params.set("sortBy", sortBy);
      } else {
        params.delete("sortBy");
      }
      const newUrl = `/${entityType}${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      router.push(newUrl);
    }
  }, [debouncedSearchTerm, sortBy, entityType, router, searchParams]);

  const handleReset = () => {
    setSearchTerm("");
    setSortBy("");
    router.push(`/${entityType}`);
  };

  return (
    <div className="flex space-x-4 mb-6">
      <Input
        type="text"
        placeholder={`Rechercher ${
          entityType === "companies" ? "une entreprise" : "une personne"
        }`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Trier par" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">
            {entityType === "companies" ? "Nom" : "Nom de famille"}
          </SelectItem>
          <SelectItem value="email">Email</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" onClick={handleReset}>
        Réinitialiser les filtres
      </Button>
    </div>
  );
}
