import { styled } from 'styled-components'
import * as Select from '@radix-ui/react-select'

export const SelectTrigger = styled(Select.Trigger)`
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0 15px;
    line-height: 1;
    height: 35px;
    gap: 5px;
    background-color: ${(props) => props.theme['gray-600']};
`
export const SelectContent = styled(Select.Content)`
    overflow: hidden;
    background-color: ${(props) => props.theme['gray-800']};
    border-radius: 6px;
    box-shadow:
        0px 10px 38px -10px rgba(22, 23, 24, 0.35),
        0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`

export const SelectViewPort = styled(Select.Viewport)`
    padding: 5px;
`
export const SelectItem = styled(Select.Item)`
    font-size: 0.75rem;
    line-height: 1;
    border-radius: 3px;
    display: flex;
    align-items: center;
    height: 25px;
    padding: 0 35px 0 25px;
    position: relative;
    user-select: none;
`

export const SelectLabel = styled(Select.Label)`
    padding: 0 25px;
    font-size: 0.875rem;
    line-height: 25px;
    font-weight: bold;
`

export const SelectSeparator = styled(Select.Separator)`
    height: 1px;
    background-color: ${(props) => props.theme['red-400']};
    margin: 5px;
`

export const SelectItemIndicator = styled(Select.ItemIndicator)`
    position: absolute;
    left: 0;
    width: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme['red-400']};
    font-weight: bold;
`
