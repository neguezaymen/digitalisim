import LoginForm from "@/components/loginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Image
        src={"/Logo.svg"}
        alt="logo"
        width={360}
        height={114}
        className="p-4 bg-black"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Bienvenue</h1>
      <p className="text-xl text-gray-600 mb-8 text-center">
        Ravi de vous revoir parmi nous !
      </p>
      <LoginForm />
    </div>
  );
}
