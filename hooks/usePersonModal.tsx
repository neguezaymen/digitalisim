import { Person } from "@prisma/client";
import { create } from "zustand";

interface PersonModalProps {
  isOpen: boolean;
  data: Person | null;
  onClose: () => void;
  onOpen: (data: Person | null) => void;
}

export const usePersonModal = create<PersonModalProps>((set) => ({
  isOpen: false,
  data: null,
  onClose: () => set({ isOpen: false, data: null }),
  onOpen: (data) => set({ isOpen: true, data }),
}));
