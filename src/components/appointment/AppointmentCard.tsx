import { cn } from '@/lib/utils';
import { FullAppointment } from '@/types/superbase';
import React from 'react';
import { HoverCardTrigger } from '../ui/hover-card';
import { HoverCard, HoverCardContent } from '@radix-ui/react-hover-card';
import AppointmentFull from './AppointmentFull';

interface Props {
    children?: React.ReactNode;
    appointment: FullAppointment;
    className?: string;
}

export const AppointmentCard: React.FC<Props> = ({ children, appointment: app, className }) => {
    return (
        <HoverCard>
            <HoverCardTrigger className='bg-background'>
                <div
                    className={cn('flex rounded-sm border-card', className)}
                    style={{ backgroundColor: app.category.color + '10' || 'inherit' }}
                >
                    <div
                        className={`inline-block w-1 rounded-l-sm mr-1`}
                        style={{ backgroundColor: app.category.color || 'black' }}
                    ></div>
                    {children}
                </div>
            </HoverCardTrigger>
            <HoverCardContent>
                <AppointmentFull className='w-80' appointment={app} />
            </HoverCardContent>
        </HoverCard>
    );
};

export default AppointmentCard;
