import { verifyToken } from "@/lib/verify-token";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await verifyToken();
  if (user) {
    redirect("/");
  }
  return <>{children}</>;
}
