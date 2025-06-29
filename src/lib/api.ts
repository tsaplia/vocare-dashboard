import { Category, FullAppointment, Patient } from '@/types/superbase';
import { dateString } from './time';

export const Api = {
    getAppointments,
    getAllPatients,
    getAllCategories
};

function getAppointments(start: Date, end: Date): Promise<FullAppointment[]> {
    return fetch(`/api/appointments?from=${dateString(start)}&to=${dateString(end)}`).then(res => res.json());
}

function getAllPatients(): Promise<Patient[]> {
    return fetch(`/api/patients`).then(res => res.json());
}

function getAllCategories(): Promise<Category[]> {
    return fetch(`/api/categories`).then(res => res.json());
}