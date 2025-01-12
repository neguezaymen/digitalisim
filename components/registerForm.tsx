"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("L'email n'est pas valide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

type RegisterFormData = z.infer<typeof registerSchema>;
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      await axios.post("/api/auth/register", data);
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setLoginError(error.response.data);
      } else {
        setLoginError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Inscription</CardTitle>
        <CardDescription className="text-center">
          Remplissez les informations ci-dessous pour vous inscrire
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="name"
                placeholder="Nom"
                {...register("name")}
                className="h-12"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="email"
                placeholder="Email"
                {...register("email")}
                className="h-12"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="password"
                type="password"
                placeholder="Mot de passe"
                {...register("password")}
                className="h-12"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <p className="py-2 text-red-500">{loginError}</p>

          <Button
            disabled={isLoading}
            className="w-full mt-8 h-12 text-lg"
            type="submit"
          >
            S&apos;inscrire
            {isLoading && <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link
          href="/login"
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Déjà un compte ? Se connecter
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
