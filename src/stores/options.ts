import { getCategoryOptions, getPatientOptions } from '@/lib/options';
import { create } from 'zustand';

export type Option = { label: string; value: string };

export interface OptionsState {
  categories: Option[];
  patients: Option[];
  loading: boolean;
  load: () => Promise<void>;
}

export const useOptionsStore = create<OptionsState>((set) => ({
  categories: [],
  patients: [],
  loading: true,
  load: async () => {
    set({ loading: true });

    const [categories, patients] = await Promise.all([
      getCategoryOptions(),
      getPatientOptions()
    ]);

    set({
      categories,
      patients,
      loading: false
    });
  }
}));