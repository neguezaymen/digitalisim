"use client";
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
import { useCompanyModal } from "@/hooks/useCompanyModal";
import { handleError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Company } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
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

export function CompanyModal() {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: company, isOpen, onClose } = useCompanyModal();
  const {
    register,
    reset,
    handleSubmit,
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
  const handleSaveCompany = async (updatedCompany: Company) => {
    try {
      if (company) {
        await axios.patch("/api/companies", updatedCompany);
      } else {
        await axios.post("/api/companies", updatedCompany);
      }

      window.location.reload();
      onClose();
    } catch (error) {
      setError(handleError(error));
    }
  };

  const handleDeleteCompany = async (id: number) => {
    try {
      await axios.delete(`/api/companies/${id}`);
      window.location.reload();
      onClose();
    } catch (error) {
      setError(handleError(error));
    }
  };
  const onSubmit = async (data: CompanyFormValues) => {
    const companyToSave = {
      ...company,
      ...data,
      id: company ? company.id : Date.now(),
    } as Company;

    try {
      setIsLoading(true);
      await handleSaveCompany(companyToSave);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModify = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleClose = () => {
    onClose();
    setIsEditing(false);
  };
  const handleDeleting = async () => {
    if (company) {
      setIsDeleting(true);
      await handleDeleteCompany(company.id);
      setIsDeleting(false);
    }
  };
  useEffect(() => {
    if (company) {
      reset({
        name: company.name || "",
        email: company.email || "",
        phone: company.phone || "",
        website: company.website || "",
      });
    } else {
      reset({
        name: "",
        email: "",
        phone: "",
        website: "",
      });
    }
  }, [company, reset]);
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
                <Input
                  id="name"
                  {...register("name")}
                  disabled={!isEditing && !!company}
                />
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
                  disabled={!isEditing && !!company}
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
                  disabled={!isEditing && !!company}
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
                  disabled={!isEditing && !!company}
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
            {isEditing || !company ? (
              <Button type="submit" disabled={isLoading}>
                Sauvegarder
                {isLoading && <Loader2 className="animate-spin" />}
              </Button>
            ) : (
              <Button onClick={handleModify}>Modifier</Button>
            )}
            {company && (
              <Button variant="destructive" onClick={handleDeleting}>
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
