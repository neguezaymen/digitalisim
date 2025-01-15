"use client";
import { usePersonModal } from "@/hooks/usePersonModal";
import { Person } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface PersonModalContentProps {
  person: Person;
}

const PersonModalContent = ({ person }: PersonModalContentProps) => {
  const { onOpen } = usePersonModal();

  return (
    <Card
      key={person.id}
      className="bg-white cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onOpen(person)}
    >
      <CardHeader>
        <CardTitle>{`${person.firstname} ${person.lastname}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{person.email}</p>
        <p className="text-sm text-muted-foreground">{person.phone}</p>
      </CardContent>
    </Card>
  );
};

export default PersonModalContent;
