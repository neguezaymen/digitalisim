"use client";
import { usePersonModal } from "@/hooks/usePersonModal";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";

const AddPersonButton = () => {
  const { onOpen } = usePersonModal();
  return (
    <Button onClick={() => onOpen(null)}>
      <Plus className="mr-2 h-4 w-4" /> Ajouter une personne
    </Button>
  );
};

export default AddPersonButton;
