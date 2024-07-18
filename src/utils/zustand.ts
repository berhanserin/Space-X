import axios from 'axios';
import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage } from 'zustand/middleware';
import { persist, StateStorage } from 'zustand/middleware';

type AppPersistStore = {
  auth: string;
  setAuth: (token: string) => void;
};

export const appPersistStorage = new MMKV({ id: 'spacex' });

const zustandMMKVStorage: StateStorage = {
  setItem: (name, value) => {
    return appPersistStorage.set(name, value);
  },
  getItem: name => {
    const value = appPersistStorage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return appPersistStorage.delete(name);
  },
};

export const useAppState = create<
  AppPersistStore,
  [['zustand/persist', AppPersistStore]]
>(
  persist(
    (set, get) => ({
      auth: '',
      setAuth: token => {
        if (token.length == 0) {
          delete axios.defaults.headers.common['Authorization'];
        } else {
          axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
        }
        set({ auth: token });
      },
    }),
    {
      name: 'spacex',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
