import { z } from 'zod';

export const appointmentSchema = z.object({
    title: z.string().min(1, 'Pflichtfeld'),
    category_id: z.string().min(1, 'Pflichtfeld'),
    date: z.string().min(1, 'Pflichtfeld'),
    timeFrom: z.string().min(1, 'Pflichtfeld'),
    timeTo: z.string().min(1, 'Pflichtfeld'),
    patient_id: z.string().min(1, 'Pflichtfeld'),
    location: z.string().optional(),
    notes: z.string().optional()
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
