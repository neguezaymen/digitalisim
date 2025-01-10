import HomePage from "@/components/home-page";
import db from "@/lib/db";

export default async function Home() {
  const companies = await db.company.findMany();
  const persons = await db.person.findMany();
  return <HomePage companies={companies} persones={persons} />;
}
