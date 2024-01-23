import { StateStorage, createJSONStorage } from "zustand/middleware";

const firebaseUrl = import.meta.env.VITE_FIREBASE_URL;

const storageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) =>
      res.json()
    );
    return JSON.stringify(data);
  },
  setItem: async function (name: string, value: string): Promise<void> {
    await fetch(`${firebaseUrl}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((res) => res.json());
    return;
  },
  removeItem: function (name: string): void | Promise<void> {
    sessionStorage.removeItem(name);
  },
};

export const firebaseStorage = createJSONStorage(() => storageApi);
