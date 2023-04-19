import styled from 'styled-components'

export const TeamsContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`

export const ValidGame = styled.div`
    font-size: 0.5rem;

    position: absolute;
    bottom: -1rem;
    left: 0;
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

export interface TeamPreviousGameStatusProps {
    status: 'victory' | 'lose' | 'draw'
}

export const TeamPreviousGameStatus = styled.div<TeamPreviousGameStatusProps>`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${(props) =>
        props.status === 'victory'
            ? props.theme['green-500']
            : props.status === 'lose'
            ? props.theme['red-500']
            : props.theme['gray-500']};
`
