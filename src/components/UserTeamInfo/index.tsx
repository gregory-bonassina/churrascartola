/* eslint-disable camelcase */
import { AvatarContainer, NamesContainer, UserContainer } from './styles'

interface UserTeamInfoProps {
    nome: string
    nome_cartola: string
    url_escudo_svg: string
}

export function UserTeamInfo({ nome, nome_cartola, url_escudo_svg }: UserTeamInfoProps) {
    return (
        <UserContainer>
            <AvatarContainer>
                <img src={url_escudo_svg} alt="" />
            </AvatarContainer>
            <NamesContainer>
                <strong>{nome}</strong>
                <span>{nome_cartola}</span>
            </NamesContainer>
        </UserContainer>
    )
}
