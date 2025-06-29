import { dateString, timeString } from '@/lib/time';
import { cn } from '@/lib/utils';
import { FullAppointment } from '@/types/superbase';
import { LucideClock, LucideMapPin, LucideNotebook, LucideTriangle, LucideUser } from 'lucide-react';
import React from 'react';

interface Props {
    className?: string;
    appointment: FullAppointment;
}

export const AppointmentFull: React.FC<Props> = ({ className, appointment: app }) => {
    return (
        <div className={cn('bg-card p-4 rounded-lg shadow border space-y-2', className)}>
            {/* Title row */}
            <div className='flex items-center gap-2'>
                {app.category?.color && (
                    <div className='w-4 h-4 rounded-sm' style={{ backgroundColor: app.category.color }} />
                )}
                <div className='text-lg font-semibold leading-[1.25]'>{app.title}</div>
            </div>
            {/* Assignees */}
            {app.assignees.length > 0 && (
                <div className='text-md'>
                    <span className='text-muted-foreground'>Zugewiesen: </span>
                    {app.assignees.map(as => `${as.user.firstname} ${as.user.lastname}`).join(', ')}
                </div>
            )}

            {/* Time, patient, location, notes, category */}
            <div className='text-muted-foreground space-y-1 text-sm'>
                <div className='flex items-start gap-2'>
                    <LucideClock className='w-4 h-4 pt-[2px]' />
                    <span>
                        {dateString(new Date(app.start))}: {timeString(new Date(app.start))} –{' '}
                        {timeString(new Date(app.end))}
                    </span>
                </div>

                <div className='flex items-start gap-2'>
                    <LucideUser className='w-4 h-4 pt-[2px]' />
                    <span>
                        {app.patient.firstname} {app.patient.lastname}
                    </span>
                </div>

                <div className='flex items-start gap-2'>
                    <LucideTriangle className='w-4 h-4 pt-[2px]' />
                    <span>{app.category.label}</span>
                </div>
                {app.location && (
                    <div className='flex items-start gap-2'>
                        <LucideMapPin className='w-4 h-4 pt-[2px]' />
                        <span>{app.location}</span>
                    </div>
                )}

                {app.notes && (
                    <div className='flex items-start gap-2'>
                        <LucideNotebook className='w-4 h-4 pt-[2px]' />
                        <span>{app.notes}</span>
                    </div>
                )}
            </div>

            {/* Activities as list */}
            {app.activities?.length > 0 && (
                <ul className='pt-1 border-t border-muted text-muted-foreground text-sm list-disc list-inside space-y-0.5'>
                    {app.activities.map(act => (
                        <li key={act.id}>{act.content}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AppointmentFull;
