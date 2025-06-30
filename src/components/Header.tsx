'use client';

import React from 'react';
import CalendarInput from './form/CalendarInput';
import { useCalendarStore } from '@/stores/calendar';
import { cn } from '@/lib/utils';
import Views from './Views';
import Filters from './Filters';
import EditModal from './EditModal';
import { LucidePlus } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    const date = useCalendarStore(state => state.date);
    const setDate = useCalendarStore(state => state.setDate);
    return (
        <div className={cn(className, 'p-2 flex gap-2 items-center')}>
            <CalendarInput
                date={date.toISOString()}
                setDate={date => {
                    if (date) setDate(new Date(date));
                }}
            />
            <Views className='mr-auto' />
            <Filters />
            <EditModal>
                <Button>
                    <LucidePlus /> Neuer Termin
                </Button>
            </EditModal>
        </div>
    );
};

export default Header;
