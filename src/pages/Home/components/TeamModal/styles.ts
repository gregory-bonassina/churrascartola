import * as Dialog from '@radix-ui/react-dialog'
import styled from 'styled-components'

export const Overlay = styled(Dialog.Overlay)`
    position: fixed;
    width: 100vw;
    height: 100vh;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
    min-width: 32rem;
    height: 90%;
    width: 60%;
    border-radius: 6px;
    padding: 2.5rem 3rem;
    background: ${(props) => props.theme['gray-800']};

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    overflow: hidden;
`

export const CloseButton = styled(Dialog.Close)`
    position: absolute;
    background: transparent;
    border: 0;
    top: 1.5rem;
    right: 1.5rem;
    line-height: 0;
    cursor: pointer;
    color: ${(props) => props.theme['gray-500']};
`

export const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;

    padding: 0 0 1rem 0;

    height: calc(100% - 1rem);
`

export const TeamContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
`

export const PlayerContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
        width: 80px;
        height: 80px;
    }
`
export const PlayerCaptain = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e3672b;
    border-top-left-radius: 6px;
    width: 40px;
    height: 40px;
    clip-path: polygon(0 0, 0 100%, 50% 50%, 100% 0, 0 0);

    span {
        font-size: 0.875rem;
        font-weight: bold;
        margin-left: -18px;
        margin-top: -14px;
    }
`
