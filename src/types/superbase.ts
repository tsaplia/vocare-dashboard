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
    firstname: string;
    lastname: string;
    birth_date?: Timestamp;
    care_level?: number;
    pronoun?: string;
    email?: string;
    active?: boolean;
    active_since?: Timestamp;
};

export type Category = {
    id: UUID;
    // created_at: Timestamp;
    // updated_at: Timestamp | null;
    label: string;
    description?: string;
    color: string;
    icon?: string;
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
    patient: UUID;
    category: UUID;
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
