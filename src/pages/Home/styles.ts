import styled from 'styled-components'

export const HomeContainer = styled.main`
    width: 100%;
    max-width: 1120px;
    margin: 4rem auto 0;
    padding: 0 1.5rem;
`

export const TeamsTable = styled.table`
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
export const UserContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const NamesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    strong {
        font-size: 1.25rem;
    }

    span {
        font-size: 0.875rem;
        color: ${(props) => props.theme['gray-300']};
    }
`

export const AvatarContainer = styled.div`
    img {
        width: 40px;
        height: 40px;
    }
`
