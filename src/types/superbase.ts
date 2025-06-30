export type UUID = string;
export type Timestamp = string;

export type Activity = {
    id: UUID;
    // created_at: Timestamp;
    // created_by: UUID | null;
    // appointment: UUID | null;
    type: string | null;
    content: string | null;
};

export type Patient = {
    id: UUID;
    // created_at: Timestamp;
    firstname: string | null;
    lastname: string | null;
    birth_date: Timestamp | null;
    care_level: number | null;
    pronoun: string | null;
    email: string | null;
    active: boolean | null;
    active_since: Timestamp | null;
};

export type Category = {
    id: UUID;
    // created_at: Timestamp;
    // updated_at: Timestamp | null;
    label: string;
    description: string | null;
    color: string | null;
    icon: string | null;
};

export type Relative = {
    id: UUID;
    // created_at: Timestamp;
    firstname: string | null;
    lastname: string | null;
    pronoun: string | null;
    notes: string | null;
};

export type AppointmentAssignee = {
    id: UUID;
    // created_at: Timestamp;
    appointment: UUID;
    // user: UUID | null;
    user_type: 'relatives' | string;
    user: Relative; // joined on user
};

export type Appointment = {
    id?: UUID;
    // created_at: Timestamp;
    // updated_at: Timestamp | null;
    start: Timestamp;
    end: Timestamp;
    location?: string;
    notes?: string;
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attachements?: any[] | null;
    patient_id: UUID;
    category_id: UUID;
    activities?: Activity[];
    assignees?: AppointmentAssignee[];
};

export type FullAppointment = {
    id: UUID;
    // created_at: Timestamp;
    // updated_at: Timestamp | null;
    start: Timestamp;
    end: Timestamp;
    location?: string;
    notes?: string;
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attachements?: any[] | null;
    patient: Patient;
    category: Category;
    activities?: Activity[];
    assignees?: AppointmentAssignee[];
};
