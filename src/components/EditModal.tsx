import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from './ui/dialog';
import React from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { DialogHeader, DialogFooter } from './ui/dialog';
import { AppointmentFormData, appointmentSchema } from '@/lib/schema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import OptionInput from './form/OptionInput';
import { useOptionsStore } from '@/stores/options';
import CalendarInput from './form/CalendarInput';
import { FullAppointment, Appointment } from '@/types/superbase';
import { combineDateTime, timeString } from '@/lib/time';
import { Api } from '@/lib/api';

interface Props {
    editData?: FullAppointment | null;
    children: React.ReactNode;
}

function toFormDate(app: FullAppointment): AppointmentFormData {
    return {
        ...app,
        category_id: app.category.id,
        patient_id: app.patient.id,
        date: app.start,
        timeTo: timeString(new Date(app.end)),
        timeFrom: timeString(new Date(app.start))
    };
}

function fromFormDate(app: AppointmentFormData): Appointment {
    return {
        ...app,
        end: combineDateTime(app.date, app.timeTo).toISOString(),
        start: combineDateTime(app.date, app.timeFrom).toISOString()
    };
}

export const EditModal: React.FC<Props> = ({ children, editData: editData }) => {
    const categoryOptions = useOptionsStore(state => state.categories);
    const patientOptions = useOptionsStore(state => state.patients);
    const [open, setOpen] = React.useState(false);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<AppointmentFormData>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: editData ? toFormDate(editData) : undefined
    });

    const onSubmit = (data: AppointmentFormData) => {
        const _data = fromFormDate(data);
        if (editData) {
            Api.updateAppointment(editData.id, _data).then(() => setOpen(false));
        } else {
            Api.addAppointment(_data).then(() => setOpen(false));
        }
    };

    const handleDelete = () => {
        Api.deleteAppointment(editData!.id).then(() => setOpen(false));
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className='sm:max-w-[500px] max-h-3/4 overflow-y-auto'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <DialogHeader>
                        <DialogTitle>{editData ? 'Termin bearbeiten' : 'Termin erstellen'}</DialogTitle>
                        <DialogDescription>Bitte fülle alle Pflichtfelder aus.</DialogDescription>
                    </DialogHeader>

                    <div className='grid gap-3'>
                        <Label htmlFor='title'>Titel</Label>
                        <Input id='title' {...register('title')} />
                        {errors.title && <p className='text-sm text-red-500'>{errors.title.message}</p>}
                    </div>

                    <div className='grid gap-3'>
                        <Label htmlFor='category'>Kategorie</Label>
                        <Controller
                            control={control}
                            name='category_id'
                            render={({ field }) => (
                                <OptionInput
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    options={categoryOptions}
                                />
                            )}
                        />
                        {errors.category_id && <p className='text-sm text-red-500'>{errors.category_id.message}</p>}
                    </div>

                    <div className='grid gap-3'>
                        <Label htmlFor='date'>Datum</Label>
                        <Controller
                            control={control}
                            name='date'
                            render={({ field }) => (
                                <CalendarInput setDate={field.onChange} date={field.value} {...register('date')} />
                            )}
                        />

                        {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='grid gap-3'>
                            <Label htmlFor='timeFrom'>Zeit von</Label>
                            <Input
                                id='timeFrom'
                                type='time'
                                step='60'
                                className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
                                {...register('timeFrom')}
                            />
                            {errors.timeFrom && <p className='text-sm text-red-500'>{errors.timeFrom.message}</p>}
                        </div>
                        <div className='grid gap-3'>
                            <Label htmlFor='timeTo'>Zeit bis</Label>
                            <Input
                                id='timeTo'
                                type='time'
                                step='60'
                                className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
                                {...register('timeTo')}
                            />
                            {errors.timeTo && <p className='text-sm text-red-500'>{errors.timeTo.message}</p>}
                        </div>
                    </div>

                    <div className='grid gap-3'>
                        <Label htmlFor='patient'>Patient</Label>
                        <Controller
                            control={control}
                            name='patient_id'
                            render={({ field }) => (
                                <OptionInput
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    options={patientOptions}
                                />
                            )}
                        />
                        {errors.patient_id && <p className='text-sm text-red-500'>{errors.patient_id.message}</p>}
                    </div>

                    <div className='grid gap-3'>
                        <Label htmlFor='location'>Ort (optional)</Label>
                        <Input id='location' {...register('location')} />
                    </div>

                    <div className='grid gap-3'>
                        <Label htmlFor='notes'>Notiz (optional)</Label>
                        <Input id='notes' {...register('notes')} />
                    </div>

                    <DialogFooter className='pt-2'>
                        <DialogClose asChild>
                            <Button variant='outline' type='button'>
                                Abbrechen
                            </Button>
                        </DialogClose>
                        {editData && (
                            <Button type='button' variant='destructive' onClick={handleDelete}>
                                Löschen
                            </Button>
                        )}
                        <Button type='submit'>Speichern</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditModal;
