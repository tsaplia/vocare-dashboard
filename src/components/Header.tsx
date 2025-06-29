'use client';

import React from 'react';
import CalendarInput from './CalendarInput';
import { useCalendarStore } from '@/stores/calendar';
import { cn } from '@/lib/utils';
import Views from './Views';
import { Button } from './ui/button';
import { LucidePlus } from 'lucide-react';
import Filters from './Filters';

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    const date = useCalendarStore(state => state.date);
    const setDate = useCalendarStore(state => state.setDate);
    return (
        <div className={cn(className, 'p-2 flex gap-2 items-center')}>
            <CalendarInput date={date} setDate={setDate} />
            <Views className='mr-auto'/>
            <Filters/>
            <Button ><LucidePlus/> Add Task</Button>
        </div>
    );
};

export default Header;
