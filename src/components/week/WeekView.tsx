'use client';
import { firstDayOfWeek, sameDay, deDateString, MILLIS_PER_DAY } from '@/lib/time';
import React, { ReactNode } from 'react';
import WeekDay from './WeekDay';
import WeekGreed from './WeekGrid';
import { useCalendarStore } from '@/stores/calendar';
import { useFiltered } from '@/hooks/filter';

export const WeekView: React.FC = () => {
    const date = useCalendarStore(state => state.date);
    const start = firstDayOfWeek(date).getTime();

    const filtered = useFiltered();

    const days: ReactNode[] = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(date.valueOf() + i * MILLIS_PER_DAY);
        days.push(<WeekDay appointments={filtered.filter(a => sameDay(new Date(a.start), day))} key={i} date={day} />);
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
