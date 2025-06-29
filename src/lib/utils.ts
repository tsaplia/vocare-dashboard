import { CalendarStore } from '@/stores/calendar';
import { FullAppointment } from '@/types/superbase';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function applyFilters(appointments: FullAppointment[], filters: CalendarStore['filters']) {
    const now = new Date();
    return appointments.filter(app => {
        if (!filters.showPast && new Date(app.end) < now) return false;
        if (filters.patient && app.patient.id !== filters.patient) return false;
        if (filters.category && app.category.id !== filters.category) return false;
        return true;
    });
}