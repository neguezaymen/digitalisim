"use client";
import { useCompanyModal } from "@/hooks/useCompanyModal";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";

const AddCompanyButton = () => {
  const { onOpen } = useCompanyModal();

  return (
    <Button onClick={() => onOpen(null)}>
      <Plus className="mr-2 h-4 w-4" /> Ajouter une entreprise
    </Button>
  );
};

export default AddCompanyButton;
