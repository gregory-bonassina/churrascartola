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
