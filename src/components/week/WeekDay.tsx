import { FullAppointment } from '@/types/superbase';
import React from 'react';
import Appointment from '../appointment/Appointment';

interface Props {
    appointments: FullAppointment[];
    date: Date;
}

function getRowStart(date: Date) {
    return Math.round((date.getHours() * 60 + date.getMinutes()) / 5) + 1;
}

export const WeekDay: React.FC<Props> = ({ appointments: app }) => {
    return (
        <div className='grid grid-cols-1 [grid-template-rows:repeat(288,var(--week-row-height))] w-full px-1'>
            {app.map((a) => (
                <div
                    key={a.id}
                    className='w-full grid col-start-1 col-end-1 overflow-y-clip'
                    style={{ gridRowStart: getRowStart(new Date(a.start)), gridRowEnd: getRowStart(new Date(a.end)) }}
                >
                    <Appointment key={a.id} appointment={a} className='h-full' />
                </div>
            ))}
        </div>
    );
};

export default WeekDay;
