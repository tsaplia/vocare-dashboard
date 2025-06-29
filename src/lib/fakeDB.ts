import { faker } from '@faker-js/faker';
import { dateString } from './time';
import { Category, FullAppointment, Patient } from '@/types/superbase';

export const patients: Patient[] = Array.from({ length: 10 }).map(() => ({
    id: faker.string.uuid(),
    // created_at: faker.date.past().toISOString(),
    // updated_at: faker.date.recent().toISOString(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    birth_date: faker.date.birthdate().toISOString(),
    care_level: faker.number.int({ min: 1, max: 5 }),
    pronoun: faker.helpers.arrayElement(['he/him', 'she/her', 'they/them']),
    email: faker.internet.email(),
    active: true,
    active_since: faker.date.past().toISOString()
}));

export const categories: Category[] = Array.from({ length: 10 }).map(() => ({
    id: faker.string.uuid(),
    // created_at: faker.date.past().toISOString(),
    // updated_at: faker.date.recent().toISOString(),
    label: faker.word.words(1),
    description: faker.lorem.sentence(),
    color: faker.color.rgb(),
    icon: faker.helpers.arrayElement(['stethoscope', 'calendar', 'pill'])
}));

export function fakePatient(): Patient {
    const patientId = faker.string.uuid();
    return {
        id: patientId,
        // created_at: faker.date.past().toISOString(),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        birth_date: faker.date.birthdate().toISOString(),
        care_level: faker.number.int({ min: 1, max: 5 }),
        pronoun: faker.helpers.arrayElement(['he/him', 'she/her', 'they/them']),
        email: faker.internet.email(),
        active: true,
        active_since: faker.date.past().toISOString()
    };
}

export const fakeAppointment = (date: Date): FullAppointment => {
    const appointmentId = faker.string.uuid();
    const patient = faker.helpers.arrayElement(patients);
    const category = faker.helpers.arrayElement(categories);

    const day = dateString(date);
    const dayStart = new Date(`${day}T00:00:00+02:00`);
    const dayEnd = new Date(`${day}T23:59:59+02:00`);

    const start = faker.date.between({ from: dayStart, to: dayEnd });
    const end = faker.date.between({ from: start.valueOf() + 15 * 60 * 1000, to: dayEnd });

    return {
        id: appointmentId,
        // created_at: faker.date.past().toISOString(),
        // updated_at: faker.date.recent().toISOString(),
        start: start.toISOString(),
        end: end.toISOString(),
        location: faker.location.streetAddress(),
        notes: faker.lorem.sentence(),
        title: faker.lorem.words(3),
        attachements: [],
        patient,
        category,
        activities: Array.from({ length: 2 }).map(() => ({
            id: faker.string.uuid(),
            created_at: faker.date.recent().toISOString(),
            created_by: faker.string.uuid(),
            appointment: appointmentId,
            type: faker.helpers.arrayElement(['note', 'reminder']),
            content: faker.lorem.sentence()
        })),
        assignees: Array.from({ length: 2 }).map(() => ({
            id: faker.string.uuid(),
            created_at: faker.date.recent().toISOString(),
            created_by: faker.string.uuid(),
            appointment: appointmentId,
            user_type: 'relatives',
            user: {
                id: faker.string.uuid(),
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                pronoun: faker.helpers.arrayElement(['he/him', 'she/her', 'they/them']),
                notes: null
            }
        }))
    };
};

export const fakeRange = (count: number, from: Date, to: Date) => {
    return Array.from({ length: count }).map(() => fakeAppointment(faker.date.between({ from, to })));
};
