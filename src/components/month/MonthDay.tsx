import { cn } from '@/lib/utils';
import { FullAppointment } from '@/types/superbase';
import React from 'react';
import AppointmentCard from '../appointment/AppointmentCard';
import { sameDay } from '@/lib/time';

interface Props {
    appointments: FullAppointment[];
    date: Date;
    selected?: boolean;
    onClick?: () => void;
}

export const MonthDay: React.FC<Props> = ({ appointments, date, selected, onClick }) => {
    const today = sameDay(date, new Date());
    return (
        <div
            className={cn(
                `w-full p-1 h-30 border flex flex-col gap-2 overflow-y-auto`,
                selected ? 'bg-accent' : 'bg-white'
            )}
            onClick={onClick}
        >
            <div>
                <span
                    className={cn(
                        'inline-block py-[0.1rem] px-[0.2rem] rounded text-sm',
                        today ? 'bg-foreground text-background' : ''
                    )}
                >
                    {date.getDate()}
                </span>
            </div>
            {appointments.map(a => (
                <AppointmentCard key={a.id} appointment={a}>
                    <div className='line-clamp-2 text-sm leading-[0.9]'>{a.title}</div>
                </AppointmentCard>
            ))}
        </div>
    );
};

export default MonthDay;
