import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Option } from '@/stores/options';

interface Props extends React.ComponentProps<typeof SelectPrimitive.Root> {
    className?: string;
    label?: string;
    options: Option[];
    optionsOnly?: boolean;
    value?: string;
    onValueChange?: (value: string) => void;
}

export const OptionInput: React.FC<Props> = ({
    className,
    options,
    optionsOnly,
    label,
    value,
    onValueChange,
    ...props
}) => {
    return (
        <Select value={value} onValueChange={onValueChange} {...props}>
            <SelectTrigger className={className}>
                <SelectValue placeholder='Wählen Sie' />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {label && <SelectLabel>{label}</SelectLabel>}
                    {!optionsOnly && <SelectItem value={'none'}>Wählen Sie</SelectItem>}
                    {options.map(o => (
                        <SelectItem key={o.value} value={o.value}>
                            {o.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default OptionInput;
