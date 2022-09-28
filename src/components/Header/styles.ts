import styled from 'styled-components'

export const HeaderContainer = styled.header`
    background: ${(props) => props.theme['gray-900']};
    padding: 0.75rem 0 3.5rem;
`

export const HeaderContent = styled.div`
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 1.5rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
        width: 200px;
    }
`
