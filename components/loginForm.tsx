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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("L'email n'est pas valide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

type LoginFormData = z.infer<typeof loginSchema>;
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const onSubmit = async (data: LoginFormData) => {
    try {
      await axios.post("/api/auth/login", data);
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setLoginError(error.response.data);
      } else {
        setLoginError("An unexpected error occurred");
      }
    }
  };
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Connexion</CardTitle>
        <CardDescription className="text-center">
          Entrez vos identifiants pour accéder à votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-6">
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
          <Button className="w-full mt-8 h-12 text-lg" type="submit">
            Se connecter
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link
          href="/register"
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Pas encore de compte ? S&apos;inscrire
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
