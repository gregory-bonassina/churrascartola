import { CaretDown, CaretUp, Check } from 'phosphor-react'
import {
    SelectContent,
    SelectItem,
    SelectItemIndicator,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectViewPort,
} from './styles'
import * as SelectRadix from '@radix-ui/react-select'

interface SelectItemProps {
    handleSelectItem: (order: string) => void
    selectedItem: string
    defaultValue: string
    items: string[]
}

export function Select({ handleSelectItem, selectedItem, defaultValue, items: values }: SelectItemProps) {
    return (
        <SelectRadix.Root onValueChange={(order: string) => handleSelectItem(order)} value={selectedItem}>
            <SelectTrigger>
                <SelectRadix.Value defaultValue={defaultValue} />
                <SelectRadix.Icon>
                    <CaretDown size={20} />
                </SelectRadix.Icon>
            </SelectTrigger>

            <SelectRadix.Portal>
                <SelectContent position="popper">
                    <SelectRadix.ScrollUpButton>
                        <CaretUp size={20} />
                    </SelectRadix.ScrollUpButton>
                    <SelectViewPort>
                        <SelectRadix.Group>
                            <SelectLabel>RANKING</SelectLabel>
                            <SelectSeparator />
                            {values.map((item) => (
                                <SelectItem key={item} value={item}>
                                    <SelectRadix.ItemText>{item}</SelectRadix.ItemText>
                                    <SelectItemIndicator>
                                        <Check size={15} />
                                    </SelectItemIndicator>
                                </SelectItem>
                            ))}
                        </SelectRadix.Group>
                    </SelectViewPort>
                    <SelectRadix.ScrollDownButton>
                        <CaretDown size={20} />
                    </SelectRadix.ScrollDownButton>
                    <SelectRadix.Arrow />
                </SelectContent>
            </SelectRadix.Portal>
        </SelectRadix.Root>
    )
}
