'use client';

import Header from '@/components/Header';
import ListView from '@/components/ListView';
import MonthView from '@/components/month/MonthView';
import WeekView from '@/components/week/WeekView';
import { useCalendarStore } from '@/stores/calendar';
import { useOptionsStore } from '@/stores/options';
import React from 'react';

export default function Page() {
    const view = useCalendarStore(state => state.view);
    const load = useOptionsStore(state => state.load);
    React.useEffect(() => {
        load();
    }, [load]);
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            {view === 'list' && <ListView />}
            {view === 'week' && <WeekView />}
            {view === 'month' && <MonthView />}
        </div>
    );
}
