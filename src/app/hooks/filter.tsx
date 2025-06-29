import { useMemo } from 'react';
import { FullAppointment } from '@/types/superbase';
import { useCalendarStore } from '@/stores/calendar';
import { applyFilters } from '@/lib/utils';

export function useFiltered(appointments: FullAppointment[]) {
    const filters = useCalendarStore(state => state.filters);
    return useMemo(() => {
        console.log("rerender filters")
        return applyFilters(appointments, filters);
    }, [appointments, filters]);
}
