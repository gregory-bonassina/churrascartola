import styled from 'styled-components'

export const TeamsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`

type TeamContentProps = {
    alignContent: 'left' | 'right'
}

export const TeamContent = styled.div<TeamContentProps>`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: ${(props) => props.alignContent};
    align-items: center;

    gap: 0.5rem;
`
