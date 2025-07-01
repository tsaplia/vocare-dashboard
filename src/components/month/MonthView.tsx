'use client';

import { firstDayOfMonth, firstDayOfWeek, lastDayOfMonth, lastDayOfWeek, MILLIS_PER_DAY, sameDay } from '@/lib/time';
import React, { ReactNode, useEffect } from 'react';
import MonthDay from './MonthDay';
import MonthSide from './MonthSide';
import { useCalendarStore } from '@/stores/calendar';
import { useFiltered } from '@/hooks/filter';

function deWeekDay(date: Date) {
    return date.toLocaleDateString('de-DE', { weekday: 'long' });
}

export const MonthView: React.FC = () => {
    const date = useCalendarStore(state => state.date);
    const start = firstDayOfWeek(firstDayOfMonth(date)).getTime();
    const end = lastDayOfWeek(lastDayOfMonth(date)).getTime();

    const [selected, setSelected] = React.useState<number>(date.getTime());
    const filtered = useFiltered();

    useEffect(() => {
        console.log('start', start, 'end', end);
    }, [start, end]);

    const days: ReactNode[] = [];
    for (let tstamp = start; tstamp <= end; tstamp += MILLIS_PER_DAY) {
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
