import { PersonsPage } from "@/components/person-page";
import db from "@/lib/db";

export default async function PersonsServerPage() {
  const dbPersons = await db.person.findMany();

  return (
    <div>
      <PersonsPage initialPersons={dbPersons} />
    </div>
  );
}
