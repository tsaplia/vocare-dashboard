import { Appointment, Category, FullAppointment, Patient } from '@/types/superbase';
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
    const from = new Date(start);
    const to = new Date(end);
    from.setHours(0, 0, 0, 0);
    to.setHours(23, 59, 59, 999);
    return await request(`/api/appointments?from=${from.toISOString()}&to=${to.toISOString()}`);
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
