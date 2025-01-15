import { PersonsPage } from "@/components/person-page";
import db from "@/lib/db";

export default async function PersonsServerPage({
  searchParams,
}: {
  params: { [key: string]: string };
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const dbPersons = await db.person.findMany();
  const sParams = await searchParams;
  return (
    <div>
      <PersonsPage initialPersons={dbPersons} searchParams={sParams} />
    </div>
  );
}
