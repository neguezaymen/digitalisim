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
import { zodResolver } from "@hookform/resolvers/zod";
import { Person } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const personSchema = z.object({
  firstname: z.string().min(1, "Le prénom est requis"),
  lastname: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(1, "Le téléphone est requis"),
});

type PersonFormValues = z.infer<typeof personSchema>;

interface PersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  person: Person | null;
  onSave: (person: Person) => void;
  onDelete: (id: number) => void;
  error: string | null;
}

export function PersonModal({
  isOpen,
  onClose,
  person,
  onSave,
  onDelete,
  error,
}: PersonModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PersonFormValues>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
    },
  });
  const onSubmit = async (data: PersonFormValues) => {
    const personToSave = {
      ...person,
      ...data,
      id: person ? person.id : Date.now(),
    } as Person;

    try {
      setIsLoading(true);
      await onSave(personToSave);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (person) {
      reset({
        firstname: person.firstname,
        lastname: person.lastname,
        email: person.email,
        phone: person.phone,
      });
      setIsEditing(false);
    } else {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
      });
      setIsEditing(true);
    }
  }, [person, reset]);
  const handleModify = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditing(true);
  };
  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };

  const handleDeleting = async () => {
    if (person) {
      setIsDeleting(true);
      await onDelete(person.id);
      setIsDeleting(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] w-5/6 md:w-full">
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstname" className="text-right">
                Prénom
              </Label>
              <div className="col-span-3">
                <Input
                  id="firstname"
                  {...register("firstname")}
                  disabled={!isEditing}
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastname" className="text-right">
                Nom
              </Label>
              <div className="col-span-3">
                <Input
                  id="lastname"
                  {...register("lastname")}
                  disabled={!isEditing}
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-3">
                <Input
                  id="email"
                  {...register("email")}
                  disabled={!isEditing}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Téléphone
              </Label>
              <div className="col-span-3">
                <Input
                  id="phone"
                  {...register("phone")}
                  disabled={!isEditing}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <DialogFooter className="flex flex-col md:flex-row gap-4">
            {isEditing ? (
              <Button type="submit" disabled={isLoading}>
                Sauvegarder
                {isLoading && <Loader2 className="animate-spin" />}
              </Button>
            ) : (
              <Button onClick={handleModify}>Modifier</Button>
            )}
            {person && (
              <Button
                variant="destructive"
                onClick={handleDeleting}
                disabled={isDeleting}
              >
                Supprimer
                {isDeleting && <Loader2 className="animate-spin" />}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
