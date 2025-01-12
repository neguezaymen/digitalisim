"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/contexts/user-context";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LogoutModal } from "./logout-modal";

export const Navbar = () => {
  const { name } = useUser();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white text-gray-900 h-16">
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Avatar>
          <AvatarImage alt={name} />
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="text-lg font-semibold">Bienvenue, {name}</span>
      </div>
      <LogoutModal onLogout={handleLogout} />
    </nav>
  );
};
