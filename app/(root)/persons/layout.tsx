import { FilterBar } from "@/components/filter-bar";

export default function PersonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Personnes</h1>
      <FilterBar entityType="persons" />
      {children}
    </div>
  );
}
