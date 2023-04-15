import styled from 'styled-components'

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
