'use client';

import { firstDayOfMonth, firstDayOfWeek, lastDayOfMonth, lastDayOfWeek, MILLIS_PER_DAY, sameDay } from '@/lib/time';
import { FullAppointment } from '@/types/superbase';
import React, { ReactNode, useEffect, useMemo } from 'react';
import MonthDay from './MonthDay';
import MonthSide from './MonthSide';
import { Api } from '@/lib/api';
import { useCalendarStore } from '@/stores/calendar';
import { useFiltered } from '@/app/hooks/filter';


function deWeekDay(date: Date) {
    return date.toLocaleDateString('de-DE', { weekday: 'long' });
}

export const MonthView: React.FC = () => {
    const date = useCalendarStore(state => state.date);
    const start = useMemo(() => firstDayOfWeek(firstDayOfMonth(date)), [date]);
    const end = useMemo(() => lastDayOfWeek(lastDayOfMonth(date)), [date]);

    const [appointments, setAppointments] = React.useState<FullAppointment[]>([]);
    const [selected, setSelected] = React.useState<number>(date.valueOf());
    const filtered = useFiltered(appointments);


    useEffect(() => {
        Api.getAppointments(start, end).then(setAppointments);
    }, [start, end]);

    const days: ReactNode[] = [];
    for (let tstamp = start.valueOf(); tstamp <= end.valueOf(); tstamp += MILLIS_PER_DAY) {
        const day = new Date(tstamp);
        days.push(
            <MonthDay
                appointments={filtered.filter(a => sameDay(new Date(a.start), day))}
                key={tstamp}
                date={day}
                selected={sameDay(day, new Date(selected))}
                onClick={() => setSelected(tstamp)}
            />
        );
    }

    return (
        <div className='flex'>
            <div className='grid grid-cols-7 flex-3/4'>
                {Array.from({ length: 7 }).map((_, i) => (
                    <div className='flex items-center justify-center h-12 border text-muted-foreground' key={i}>
                        {deWeekDay(new Date(start.valueOf() + i * MILLIS_PER_DAY))}
                    </div>
                ))}
                {days}
            </div>
            <div className='flex-1/4'>
                <MonthSide
                    appointments={filtered.filter(a => sameDay(new Date(a.start), new Date(selected)))}
                    date={new Date(selected)}
                />
            </div>
        </div>
    );
};

export default MonthView;
