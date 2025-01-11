import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Company } from "@prisma/client";
import { useEffect, useState } from "react";

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
  onSave: (company: Company) => void;
  onDelete: (id: number) => void;
}

export function CompanyModal({
  isOpen,
  onClose,
  company,
  onSave,
  onDelete,
}: CompanyModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCompany, setEditedCompany] = useState<Company>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  useEffect(() => {
    if (company) {
      setEditedCompany(company);
      setIsEditing(false);
    } else {
      setEditedCompany({
        id: Date.now(),
        name: "",
        email: "",
        phone: "",
        website: "",
      });
      setIsEditing(true);
    }
  }, [company]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCompany({ ...editedCompany, [e.target.id]: e.target.value });
  };

  const handleSave = () => {
    onSave(editedCompany);
    setIsEditing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] w-5/6 md:w-full">
        <DialogHeader>
          <DialogTitle>
            {company
              ? isEditing
                ? "Modifier l'entreprise"
                : "Détails de l'entreprise"
              : "Ajouter une entreprise"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifiez les détails de l'entreprise ici. Cliquez sur sauvegarder une fois terminé."
              : "Informations détaillées de l'entreprise."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input
              id="name"
              value={editedCompany.name}
              onChange={handleInputChange}
              className="col-span-3"
              disabled={!isEditing}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={editedCompany.email}
              onChange={handleInputChange}
              className="col-span-3"
              disabled={!isEditing}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Téléphone
            </Label>
            <Input
              id="phone"
              value={editedCompany.phone}
              onChange={handleInputChange}
              className="col-span-3"
              disabled={!isEditing}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="website" className="text-right">
              Site web
            </Label>
            <Input
              id="website"
              value={editedCompany.website}
              onChange={handleInputChange}
              className="col-span-3"
              disabled={!isEditing}
            />
          </div>
        </div>
        <DialogFooter className=" flex flex-col md:flex md:flex-row gap-4">
          {isEditing ? (
            <Button onClick={handleSave}>Sauvegarder</Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Modifier</Button>
          )}
          {company && (
            <Button
              variant="destructive"
              onClick={() => onDelete(editedCompany.id)}
            >
              Supprimer
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
