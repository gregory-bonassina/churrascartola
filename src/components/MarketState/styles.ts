import * as Select from '@radix-ui/react-select'
import styled from 'styled-components'

export const MarketStateContainer = styled.section`
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    margin-top: -2.75rem;
    background: ${(props) => props.theme['gray-600']};
    border-radius: 6px;
`

export const MarketStateContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
        display: flex;
        align-items: center;
        font-size: 1.25rem;

        svg {
            margin-right: 5px;
        }
    }
`
export const SelectTrigger = styled(Select.Trigger)`
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0 15px;
    font-size: 13px;
    line-height: 1;
    height: 35px;
    gap: 5px;
    background-color: ${(props) => props.theme['gray-600']};
`
export const SelectContent = styled(Select.Content)`
    overflow: hidden;
    background-color: ${(props) => props.theme['gray-800']};
    border-radius: 6px;
    box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`

export const SelectViewPort = styled(Select.Viewport)`
    padding: 5px;
`
export const SelectItem = styled(Select.Item)`
    font-size: 13px;
    line-height: 1;
    color: var(--violet11);
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
    font-size: 12px;
    line-height: 25px;
    color: var(--mauve11);
`

export const SelectSeparator = styled(Select.Separator)`
    height: 1px;
    background-color: var(--violet6);
    margin: 5px;
`

export const SelectItemIndicator = styled(Select.ItemIndicator)`
    position: absolute;
    left: 0;
    width: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`
