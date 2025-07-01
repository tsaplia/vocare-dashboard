'use client';

import { deDateString, sameDay } from '@/lib/time';
import React from 'react';
import { useCalendarStore } from '@/stores/calendar';
import { useFiltered } from '@/hooks/filter';
import AppointmentFull from './appointment/AppointmentFull';

export const ListView: React.FC = () => {
    const date = useCalendarStore(state => state.date);
    const filtered = useFiltered().filter(a => sameDay(new Date(a.start), date));

    return (
        <div className='bg-accent py-4 min-h-full flex flex-col items-center gap-6 flex-grow'>
            <div className='w-160' key={date.valueOf()}>
                <h1 className='pb-2 mb-2 text-xl font-medium text-accent-foreground first:mt-0'>
                    {deDateString(date)}
                </h1>
                {filtered.length ? (
                    <div className='flex flex-col gap-4 w-full'>
                        {filtered.map(a => (
                            <AppointmentFull className='w-full' key={a.id} appointment={a} />
                        ))}
                    </div>
                ) : (
                    <div className='text-muted-foreground text-center'>Keine Termine</div>
                )}
            </div>
        </div>
    );
};

export default ListView;
