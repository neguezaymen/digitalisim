import { verifyToken } from "@/lib/verify-token";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await verifyToken();
  if (token) {
    redirect("/");
  }
  return <>{children}</>;
}
