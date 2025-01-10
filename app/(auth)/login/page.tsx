import LoginForm from "@/components/loginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Bienvenue</h1>
      <p className="text-xl text-gray-600 mb-8 text-center">
        Ravi de vous revoir parmi nous !
      </p>
      <LoginForm />
    </div>
  );
}
