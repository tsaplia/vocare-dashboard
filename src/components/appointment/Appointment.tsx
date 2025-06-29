import { FullAppointment } from '@/types/superbase';
import { LucideClock, LucideMapPin, LucideUser } from 'lucide-react';
import React from 'react';
import AppointmentCard from './AppointmentCard';
import { timeString } from '@/lib/time';

interface Props {
    appointment: FullAppointment;
    className?: string;
}

export const Appointment: React.FC<Props> = ({ appointment: app, className }) => {
    return (
        <AppointmentCard appointment={app} className={className}>
            <div className='h-full flex-col flex p-1'>
                <div className='text-lg font-semibold mb-1 leading-[1.25]'>{app.title}</div>
                <div className='text-muted-foreground space-y-1 text-sm'>
                    <div className='flex items-center gap-2'>
                        <LucideClock className='w-4 h-4' />
                        <span>
                            {timeString(new Date(app.start))} bis {timeString(new Date(app.end))}
                        </span>
                    </div>

                    <div className='flex items-center gap-2'>
                        <LucideUser className='w-4 h-4' />
                        <span>
                            {app.patient.firstname} {app.patient.lastname}
                        </span>
                    </div>
                    {app.location && (
                        <div className='flex items-center gap-2'>
                            <LucideMapPin className='w-4 h-4' />
                            <span>{app.location}</span>
                        </div>
                    )}
                </div>
            </div>
        </AppointmentCard>
    );
};

export default Appointment;
