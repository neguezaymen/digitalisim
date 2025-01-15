import { Company } from "@prisma/client";
import { create } from "zustand";

interface CompanyModalProps {
  isOpen: boolean;
  data: Company | null;
  onClose: () => void;
  onOpen: (data: Company | null) => void;
}

export const useCompanyModal = create<CompanyModalProps>((set) => ({
  isOpen: false,
  data: null,
  onClose: () => set({ isOpen: false, data: null }),
  onOpen: (data) => set({ isOpen: true, data }),
}));
