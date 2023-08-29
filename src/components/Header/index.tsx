import { HeaderContainer, HeaderContent } from './styles'

import logoImg from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'

export function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImg} alt="" />
                <nav>
                    <NavLink to="/" title="Home">
                        Home
                    </NavLink>
                    <NavLink to="/games" title="Games">
                        Jogos
                    </NavLink>
                    <NavLink to="/top-ranked-players" title="Games">
                        Mais escalados
                    </NavLink>
                </nav>
            </HeaderContent>
        </HeaderContainer>
    )
}
