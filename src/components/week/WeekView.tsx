'use client';
import { firstDayOfWeek, lastDayOfWeek, sameDay, deDateString, MILLIS_PER_DAY } from '@/lib/time';
import { FullAppointment } from '@/types/superbase';
import React, { ReactNode, useEffect, useMemo } from 'react';
import WeekDay from './WeekDay';
import WeekGreed from './WeekGrid';
import { Api } from '@/lib/api';
import { useCalendarStore } from '@/stores/calendar';
import { useFiltered } from '@/app/hooks/filter';


export const WeekView: React.FC = () => {
    const date = useCalendarStore(state => state.date);
    const start = useMemo(() => firstDayOfWeek(date), [date]);
    const end = useMemo(() => lastDayOfWeek(date), [date]);

    const [appointments, setAppointments] = React.useState<FullAppointment[]>([]);
    const filtered = useFiltered(appointments);

    useEffect(() => {
        Api.getAppointments(start, end).then(setAppointments);
    }, [start, end]);

    const days: ReactNode[] = [];
    for (let tstamp = start.valueOf(); tstamp <= end.valueOf(); tstamp += MILLIS_PER_DAY) {
        const day = new Date(tstamp);
        days.push(
            <WeekDay appointments={filtered.filter(a => sameDay(new Date(a.start), day))} key={tstamp} date={day} />
        );
    }
    return (
        <div className='pl-16'>
            {/* Header */}
            <div className='grid grid-cols-7 '>
                {Array.from({ length: 7 }).map((_, i) => (
                    <div className='flex items-center justify-center h-12 border' key={i}>
                        {deDateString(new Date(start.valueOf() + i * MILLIS_PER_DAY))}
                    </div>
                ))}
            </div>
            {/* Calendar */}
            <div className='relative h-[calc(288*var(--week-row-height))]'>
                <WeekGreed />
                <div className='grid grid-cols-7 absolute top-0 left-0 w-full h-full'>{days}</div>
            </div>
        </div>
    );
};

export default WeekView;
