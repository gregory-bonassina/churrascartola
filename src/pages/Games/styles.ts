import styled from 'styled-components'

export const GamesTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    margin-top: 1.5rem;

    th {
        text-align: center;

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
export const TeamsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
`

export const TeamContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 0.5rem;
`
