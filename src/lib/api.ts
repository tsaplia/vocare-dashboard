import { Appointment, Category, FullAppointment, Patient } from '@/types/superbase';
import { dateString } from './time';
import { UUID } from '@/types/superbase';

export const Api = {
    getAppointments,
    getAllPatients,
    getAllCategories,
    addAppointment,
    updateAppointment,
    deleteAppointment
};

async function getAppointments(start: Date, end: Date): Promise<FullAppointment[]> {
    return await request(`/api/appointments?from=${dateString(start)}&to=${dateString(end)}`);
}

async function getAllPatients(): Promise<Patient[]> {
    return await request(`/api/patients`);
}

async function getAllCategories(): Promise<Category[]> {
    return await request(`/api/categories`);
}

async function addAppointment(appointment: Appointment) {
    return await request(`/api/appointments`, { method: 'POST', body: JSON.stringify(appointment) });
}

async function updateAppointment(id: UUID, appointment: Appointment) {
    return await request(`/api/appointments`, { method: 'PUT', body: JSON.stringify({ id, ...appointment }) });
}

async function deleteAppointment(id: UUID) {
    return await request(`/api/appointments`, { method: 'DELETE', body: JSON.stringify({ id }) });
}

async function request(url: string, options?: RequestInit) {
    const res = await fetch(url, options);
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Unknown error');
    return json;
}
