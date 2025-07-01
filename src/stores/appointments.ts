import { Api } from '@/lib/api';
import { getMonthRange } from '@/lib/time';
import { FullAppointment } from '@/types/superbase';
import { create } from 'zustand';

export type AppointmentsStore = {
    appointments: FullAppointment[];
    loadAppointments: () => void;
    dateRange: [Date, Date];
    updateDate: (date: Date) => void;
};

export const useAppointmentsStore = create<AppointmentsStore>()((set, get) => ({
    appointments: [],
    loadAppointments: () => {
        const { dateRange } = get();
        Api.getAppointments(dateRange[0], dateRange[1]).then(apps => set({ appointments: apps }));
    },
    dateRange: getMonthRange(new Date()),
    updateDate: date => {
        const newRange = getMonthRange(date);
        const {dateRange, loadAppointments} = get();
        if (dateRange[0].getTime() === newRange[0].getTime() && dateRange[1].getTime() === newRange[1].getTime()) return;
        
        set({ dateRange: newRange });
        loadAppointments();
    }
}));
