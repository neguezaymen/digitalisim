import { Button } from "@/components/ui/button";
import { Building2, Users } from "lucide-react";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <aside className="w-12 md:w-64 bg-white md:p-4 h-screen border-r border-gray-200">
      <nav className="space-y-2">
        <Link href="/companies" passHref>
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-gray-100 transition-colors"
          >
            <Building2 className="md:mr-2 h-4 w-4" />
            <span className="hidden md:block">Entreprises</span>
          </Button>
        </Link>
        <Link href="/persons" passHref>
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-gray-100 transition-colors"
          >
            <Users className="md:mr-2 h-4 w-4" />
            <span className="hidden md:block">Personnes</span>
          </Button>
        </Link>
      </nav>
    </aside>
  );
};
