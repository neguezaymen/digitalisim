"use client";

import { PersonModal } from "@/components/person-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Person } from "@prisma/client";
import axios from "axios";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface PersonsPageProps {
  initialPersons: Person[];
}

export function PersonsPage({ initialPersons }: PersonsPageProps) {
  const [persons, setPersons] = useState<Person[]>(initialPersons);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();

  const handleViewPerson = (person: Person) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  const handleAddPerson = () => {
    setSelectedPerson(null);
    setIsModalOpen(true);
  };

  const handleSavePerson = (updatedPerson: Person) => {
    if (selectedPerson) {
      axios.patch("/api/persons", updatedPerson);
      setPersons(
        persons.map((p) => (p.id === updatedPerson.id ? updatedPerson : p))
      );
    } else {
      axios.post("/api/persons", updatedPerson);
      setPersons([...persons, updatedPerson]);
    }
    setIsModalOpen(false);
  };

  const handleDeletePerson = (id: number) => {
    axios.delete(`/api/persons/${id}`);
    setPersons(persons.filter((person) => person.id !== id));
    setIsModalOpen(false);
  };

  const filterAndSortPersons = () => {
    const searchTerm = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "name";

    let filteredPersons = persons;

    if (searchTerm) {
      filteredPersons = filteredPersons.filter((person) =>
        [person.firstname, person.lastname, person.email].some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    filteredPersons.sort((a, b) => {
      if (sortBy === "name") return a.lastname.localeCompare(b.lastname);
      if (sortBy === "email") return a.email.localeCompare(b.email);
      return 0;
    });

    return filteredPersons;
  };

  const renderPersons = () => {
    const filteredPersons = filterAndSortPersons();
    return filteredPersons.map((person) => (
      <Card
        key={person.id}
        className="bg-white cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => handleViewPerson(person)}
      >
        <CardHeader>
          <CardTitle>{`${person.firstname} ${person.lastname}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{person.email}</p>
          <p className="text-sm text-muted-foreground">{person.phone}</p>
        </CardContent>
      </Card>
    ));
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between items-center mb-6">
        <Button onClick={handleAddPerson}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter une personne
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {renderPersons()}
      </div>
      <PersonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        person={selectedPerson}
        onSave={handleSavePerson}
        onDelete={handleDeletePerson}
      />
    </div>
  );
}
