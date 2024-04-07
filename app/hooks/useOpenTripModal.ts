import { create } from 'zustand';

interface OpenTripModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRentModal = create<OpenTripModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useRentModal;