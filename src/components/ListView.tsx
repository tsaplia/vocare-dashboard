'use client';

import { Api } from '@/lib/api';
import { deDateString, MILLIS_PER_DAY } from '@/lib/time';
import { FullAppointment } from '@/types/superbase';
import React, { useEffect } from 'react';
import AppointmentFull from './appointment/AppointmentFull';
import { Button } from './ui/button';
import { useCalendarStore } from '@/stores/calendar';
import { applyFilters } from '@/lib/utils';

type DayApps = {
    date: Date;
    apps: FullAppointment[];
};

export const ListView: React.FC = () => {
    const date = useCalendarStore(state => state.date);
    const filters = useCalendarStore(state => state.filters);
    const [dayApps, setDayApps] = React.useState<DayApps[]>([]);
    const [filtered, setFiltered] = React.useState<DayApps[]>([]);

    useEffect(() => {
        Api.getAppointments(date, date).then(apps => {
            setDayApps([{ date, apps }]);
        });
    }, [date]);

    useEffect(() => {
        const _filtered = dayApps.map(({ date, apps }) => ({
            date,
            apps: applyFilters(apps, filters)
        }));
        setFiltered(_filtered);
    }, [dayApps, filters]);

    function loadNextDay() {
        const lastDay = dayApps[dayApps.length - 1].date;
        const nextDay = new Date(lastDay.valueOf() + MILLIS_PER_DAY);
        Api.getAppointments(nextDay, nextDay).then(apps => {
            setDayApps([...dayApps, { date: nextDay, apps }]);
        });
    }

    return (
        <div className='bg-accent py-4 min-h-full flex flex-col items-center gap-6 flex-grow'>
            {filtered.map(({ date, apps }) => (
                <div className='w-160' key={date.valueOf()}>
                    <h1 className='pb-2 mb-2 text-xl font-medium text-accent-foreground first:mt-0'>
                        {deDateString(date)}
                    </h1>
                    {apps.length ? (
                        <div className='flex flex-col gap-4 w-full'>
                            {apps.map(a => (
                                <AppointmentFull className='w-full' key={a.id} appointment={a} />
                            ))}
                        </div>
                    ) : (
                        <div className='text-muted-foreground text-center'>Keine Termine</div>
                    )}
                </div>
            ))}
            <Button onClick={loadNextDay}>Mehr laden</Button>
        </div>
    );
};

export default ListView;
