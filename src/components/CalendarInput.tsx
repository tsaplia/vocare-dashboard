'use client';
import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { deDateString } from '@/lib/time';

type Props = {
    date?: Date;
    setDate: (date: Date) => void;
    className?: string;
};

export const CalendarInput: React.FC<Props> = ({ date, setDate, className }) => {
    return (
        <div className={className}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={'outline'}
                        className={cn('w-40 pl-3 text-left font-normal', !date && 'text-muted-foreground')}
                    >
                        {date ? deDateString(date) : <span>Pick a date</span>}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                        mode='single'
                        selected={date}
                        onSelect={(date: Date) => date && setDate(date)}
                        captionLayout='dropdown'
                        required
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default CalendarInput;
