"use client";
import React from 'react';
import { Button } from './ui/button';
import { useCalendarStore } from '@/stores/calendar';
import { cn } from '@/lib/utils';

type Props = {
    className?: string
};

export const Views : React.FC<Props> = ({className}) => {
    const view = useCalendarStore(state => state.view);
    const setView = useCalendarStore(state => state.setView);
  return (
    <div className={cn('rounded-sm bg-accent p-1 flex gap-2', className)}>
      <Button size={'sm'} variant={view === 'list' ? 'outline' : 'ghost'} onClick={() => setView('list')}>Liste</Button>
      <Button size={'sm'} variant={view === 'week' ? 'outline' : 'ghost'} onClick={() => setView('week')}>Woche</Button>
      <Button size={'sm'} variant={view === 'month' ? 'outline' : 'ghost'} onClick={() => setView('month')}>Monat</Button>
    </div>
  );
};

export default Views;