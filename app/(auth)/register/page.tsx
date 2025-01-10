import RegisterForm from "@/components/registerForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Créez votre compte
      </h1>
      <p className="text-xl text-gray-600 mb-8 text-center">
        Rejoignez-nous et commencez votre aventure !
      </p>
      <RegisterForm />
    </div>
  );
}
