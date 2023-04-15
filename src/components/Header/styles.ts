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

    nav {
        display: flex;
        gap: 0.8rem;

        a {
            display: flex;
            justify-content: center;
            align-items: center;

            text-decoration: none;

            gap: 0.5rem;

            color: ${(props) => props.theme['gray-100']};

            border-top: 3px solid transparent;
            border-bottom: 3px solid transparent;

            &:not(.active):hover {
                border-bottom: 3px solid ${(props) => props.theme['red-400']};
            }

            &.active {
                color: ${(props) => props.theme['red-400']};
            }
        }
    }
`
