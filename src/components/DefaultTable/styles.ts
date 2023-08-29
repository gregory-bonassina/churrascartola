import styled from 'styled-components'

export const DefaultTableContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;

    width: 100%;
`

export const DefaultTableContent = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;

    thead {
        position: sticky;
        top: 0;

        background: ${(props) => props.theme['gray-800']};
    }

    th {
        text-align: center;

        padding-top: 0.5rem;
        padding-bottom: 0.5rem;

        &:first-child {
            padding: 0 2rem;
            text-align: left;
        }

        &:last-child {
            padding: 0 2rem;
        }
    }

    td {
        padding: 1.25rem 2rem;
        background: ${(props) => props.theme['gray-700']};
        text-align: center;

        &:first-child {
            text-align: left;
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }

        &:last-child {
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
        }
    }
`

export const Title = styled.header`
    font-weight: bold;
    padding: 1.25rem 2rem;
    font-size: 1.125rem;
    align-self: center;
`
