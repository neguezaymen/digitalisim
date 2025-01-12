import { FilterBar } from "@/components/filter-bar";

export default function CompaniesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 bg-gray-100 h-full">
      <h1 className="text-3xl font-bold mb-6">Entreprises</h1>
      <FilterBar entityType="companies" />
      {children}
    </div>
  );
}
