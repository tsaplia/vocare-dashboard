import { useMemo } from 'react';
import { useCalendarStore } from '@/stores/calendar';
import { useAppointmentsStore } from '@/stores/appointments';

export function useFiltered() {
    const filters = useCalendarStore(state => state.filters);
    const appointments = useAppointmentsStore(state => state.appointments);
    return useMemo(() => {
        const now = new Date();
        return appointments.filter(app => {
            if (!filters.showPast && new Date(app.end) < now) return false;
            if (filters.patient && app.patient.id !== filters.patient) return false;
            if (filters.category && app.category.id !== filters.category) return false;
            return true;
        });
    }, [appointments, filters]);
}
