import { deDateString, sameDay } from '@/lib/time';
import { FullAppointment } from '@/types/superbase';
import React from 'react';
import Appointment from '../appointment/Appointment';

interface Props {
    appointments: FullAppointment[];
    date: Date;
}

export const MonthSide: React.FC<Props> = ({ appointments, date }) => {
    const today = sameDay(date, new Date());
    const dateString = deDateString(date);
    return (
        <div className='p-6 border h-full'>
            <h1 className='border-b-[2px] pb-2 mb-4 text-xl font-medium text-accent-foreground first:mt-0 text-center'>
                {dateString}
                {today && ' (Heute)'}
            </h1>
            {!!appointments.length && (
                <div className='flex flex-col gap-4'>
                    {appointments.map(a => (
                        <Appointment key={a.id} appointment={a} />
                    ))}
                </div>
            )}
            {!appointments.length && <div className='text-muted-foreground text-center'>Keine Termine</div>}
        </div>
    );
};

export default MonthSide;
