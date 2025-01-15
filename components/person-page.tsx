import { PersonModal } from "@/components/person-modal";
import { filterAndSortPersons } from "@/lib/utils";
import { Person } from "@prisma/client";
import AddPersonButton from "./add-person-button";
import PersonModalContent from "./person-modal-content";

interface PersonsPageProps {
  initialPersons: Person[];
  searchParams: { [key: string]: string | undefined };
}

export function PersonsPage({
  initialPersons,
  searchParams,
}: PersonsPageProps) {
  const renderPersons = () => {
    const filteredPersons = filterAndSortPersons({
      initialPersons,
      searchParams,
    });
    return filteredPersons.map((person) => (
      <PersonModalContent person={person} key={person.id} />
    ));
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <AddPersonButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {renderPersons()}
      </div>
      <PersonModal />
    </div>
  );
}
