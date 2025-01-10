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
import { Person } from "@prisma/client";
import { useEffect, useState } from "react";

interface PersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  person: Person | null;
  onSave: (person: Person) => void;
  onDelete: (id: number) => void;
}

export function PersonModal({
  isOpen,
  onClose,
  person,
  onSave,
  onDelete,
}: PersonModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPerson, setEditedPerson] = useState<Person>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    id: 0,
  });

  useEffect(() => {
    if (person) {
      setEditedPerson(person);
      setIsEditing(false);
    } else {
      setEditedPerson({
        id: Date.now(),
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
      });
      setIsEditing(true);
    }
  }, [person]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPerson({ ...editedPerson, [e.target.id]: e.target.value });
  };

  const handleSave = () => {
    onSave(editedPerson);
    setIsEditing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {person
              ? isEditing
                ? "Modifier la personne"
                : "Détails de la personne"
              : "Ajouter une personne"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifiez les détails de la personne ici. Cliquez sur sauvegarder une fois terminé."
              : "Informations détaillées de la personne."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstname" className="text-right">
              Prénom
            </Label>
            <Input
              id="firstname"
              value={editedPerson.firstname}
              onChange={handleInputChange}
              className="col-span-3"
              disabled={!isEditing}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastname" className="text-right">
              Nom
            </Label>
            <Input
              id="lastname"
              value={editedPerson.lastname}
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
              value={editedPerson.email}
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
              value={editedPerson.phone}
              onChange={handleInputChange}
              className="col-span-3"
              disabled={!isEditing}
            />
          </div>
        </div>
        <DialogFooter>
          {isEditing ? (
            <Button onClick={handleSave}>Sauvegarder</Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Modifier</Button>
          )}
          {person && (
            <Button
              variant="destructive"
              onClick={() => onDelete(editedPerson.id)}
            >
              Supprimer
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
