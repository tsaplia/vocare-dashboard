import { useCalendarStore } from '@/stores/calendar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import React, { ReactNode, useEffect } from 'react';
import { Button } from './ui/button';
import { Api } from '@/lib/api';
import OptionInput from './OptionInput';
import { LucideFilter } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

type Option = { label: string; value: string };

interface Props {
    className?: string;
    children?: ReactNode;
}

async function getCategoryOptions() {
    const categories = await Api.getAllCategories();
    return categories.map(c => ({ label: c.label, value: c.id }));
}

async function getPatientOptions() {
    const patients = await Api.getAllPatients();
    return patients.map(p => ({ label: `${p.firstname} ${p.lastname}`, value: p.id }));
}

export const Filters: React.FC<Props> = ({}) => {
    const filters = useCalendarStore(state => state.filters);
    const setFilters = useCalendarStore(state => state.setFilters);
    const [categoryOptions, setCategoryOptions] = React.useState<Option[]>([]);
    const [patientOptions, setPatientOptions] = React.useState<Option[]>([]);

    useEffect(() => {
        getCategoryOptions().then(setCategoryOptions);
        getPatientOptions().then(setPatientOptions);
    }, []);

    useEffect(() => {
        console.log(filters);
    }, [filters])
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
                    <Checkbox id='vergangene' onCheckedChange={(chck) => setFilters({ showPast: !!chck })} defaultChecked={filters.showPast}/>
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
