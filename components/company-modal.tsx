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
import { Company } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const companySchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(1, "Le téléphone est requis"),
  website: z.string().url("URL invalide"),
});

type CompanyFormValues = z.infer<typeof companySchema>;

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
  onSave: (company: Company) => void;
  onDelete: (id: number) => void;
  error: string | null;
}

export function CompanyModal({
  isOpen,
  onClose,
  company,
  onSave,
  onDelete,
  error,
}: CompanyModalProps) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
    },
  });

  const onSubmit = async (data: CompanyFormValues) => {
    const companyToSave = {
      ...company,
      ...data,
      id: company ? company.id : Date.now(),
    } as Company;

    try {
      await onSave(companyToSave);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (company) {
      reset({
        name: company.name,
        email: company.email,
        phone: company.phone,
        website: company.website,
      });
      setIsEditing(false);
    } else {
      reset({
        name: "",
        email: "",
        phone: "",
        website: "",
      });
      setIsEditing(true);
    }
  }, [company, reset]);
  const handleModify = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <div className="col-span-3">
                <Input id="name" {...register("name")} disabled={!isEditing} />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="website" className="text-right">
                Site web
              </Label>
              <div className="col-span-3">
                <Input
                  id="website"
                  {...register("website")}
                  disabled={!isEditing}
                />
                {errors.website && (
                  <p className="text-red-500 text-sm">
                    {errors.website.message}
                  </p>
                )}
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <DialogFooter className="flex flex-col md:flex-row gap-4">
            {isEditing ? (
              <Button type="submit">Sauvegarder</Button>
            ) : (
              <Button onClick={handleModify}>Modifier</Button>
            )}
            {company && (
              <Button
                variant="destructive"
                onClick={() => onDelete(company.id)}
              >
                Supprimer
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
