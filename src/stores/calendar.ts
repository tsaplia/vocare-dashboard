import { UUID } from '@/types/superbase';
import { create } from 'zustand';

export type CalendarStore = {
    date: Date;
    setDate: (date: Date) => void;

    filters: {
        showPast: boolean;
        patient: UUID | null;
        category: UUID | null;
    };
    setFilters: (filters: Partial<CalendarStore['filters']>) => void;

    view: 'list' | 'week' | 'month';
    setView: (view: CalendarStore['view']) => void;
};

export const useCalendarStore = create<CalendarStore>()(set => ({
    date: new Date(),
    setDate: date => set({ date }),

    filters: {
        showPast: true,
        patient: null,
        category: null
    },
    setFilters: filters => set(state => ({ filters: { ...state.filters, ...filters } })),

    view: 'list',
    setView: view => set({ view })
}));
