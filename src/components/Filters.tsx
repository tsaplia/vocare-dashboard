import { useCalendarStore } from '@/stores/calendar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import React, { ReactNode, useEffect } from 'react';
import { Button } from './ui/button';
import OptionInput from './form/OptionInput';
import { LucideFilter } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { useOptionsStore } from '@/stores/options';

interface Props {
    className?: string;
    children?: ReactNode;
}

export const Filters: React.FC<Props> = ({}) => {
    const filters = useCalendarStore(state => state.filters);
    const setFilters = useCalendarStore(state => state.setFilters);
    const categoryOptions = useOptionsStore(state => state.categories);
    const patientOptions = useOptionsStore(state => state.patients);

    useEffect(() => {
        
    }, []);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline'>
                    <LucideFilter />
                    Termine filtern
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 p-4 flex flex-col gap-4' align='start'>
                <div className='flex items-center gap-4'>
                    <Checkbox
                        id='vergangene'
                        onCheckedChange={chck => setFilters({ showPast: !!chck })}
                        defaultChecked={filters.showPast}
                    />
                    <Label htmlFor='vergangene'>Vergangene anzeigen</Label>
                </div>
                <div>
                    <Label className='ml-1 text-sm'>Kategorie</Label>
                    <OptionInput
                        className='w-full'
                        value={filters.category ?? undefined}
                        options={categoryOptions}
                        label='Kategorie'
                        onValueChange={value => setFilters({ category: value === 'none' ? null : value })}
                    />
                </div>
                <div>
                    <Label className='ml-1 text-sm'>Patient</Label>
                    <OptionInput
                        className='w-full'
                        value={filters.patient ?? undefined}
                        options={patientOptions}
                        label='Patient'
                        onValueChange={value => setFilters({ patient: value === 'none' ? null : value })}
                    />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Filters;
