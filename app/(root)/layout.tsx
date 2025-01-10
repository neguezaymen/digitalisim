import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import { UserContextProvider } from "@/contexts/user-context";
import { verifyToken } from "@/lib/verify-token";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await verifyToken();
  if (!user) {
    redirect("/login");
  }
  return (
    <UserContextProvider user={user}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Separator />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-2 md:p-6">{children}</main>
        </div>
      </div>
    </UserContextProvider>
  );
}
