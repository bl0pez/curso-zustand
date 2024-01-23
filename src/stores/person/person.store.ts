import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { customSessionStorage } from "../storages/session-storage.storage";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

const storeApi: StateCreator<PersonState & Actions> = (set) => ({
  firstName: "",
  lastName: "",

  setFirstName: (firstName: string) => set({ firstName }),
  setLastName: (lastName: string) => set({ lastName }),
});

export const usePersonStore = create<PersonState & Actions>()(
  persist(storeApi, {
    name: "person-storage",
    storage: customSessionStorage,
  })
);
