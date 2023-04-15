import { HeaderContainer, HeaderContent } from './styles'

import logoImg from '../../assets/logo.png'
import { HouseLine, SoccerBall } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImg} alt="" />
                <nav>
                    <NavLink to="/" title="Home">
                        <HouseLine size={24} />
                        Home
                    </NavLink>
                    <NavLink to="/games" title="Games">
                        <SoccerBall size={30} />
                        Jogos
                    </NavLink>
                </nav>
            </HeaderContent>
        </HeaderContainer>
    )
}
