import { useContext, useEffect, useState } from 'react'
import { apiCartola } from '../../lib/axios'
import { DefaultTable } from '../../components/DefaultTable'
import { PlayerContainer, TeamContainer } from './styles'
import { PlayersContext } from '../../contexts/PlayersContext'

interface PlayerProps {
    nome: string
    apelido: string
    apelido_abreviado: string
    foto: string
    atleta_id: number
    preco_editorial: number
}

interface TopRankedPlayersProps {
    posicao: string
    posicao_abreviacao: string
    clube: string
    escudo_clube: string
    Atleta: PlayerProps
    clube_id: number
    escalacoes: number
}

export default function TopRankedPlayers() {
    const { allPlayers } = useContext(PlayersContext)
    const [topRankedPlayers, setTopRankedPlayers] = useState<TopRankedPlayersProps[]>([])

    const loadTopRankedPlayers = async () => {
        const response = await apiCartola.get('mercado/destaques')
        setTopRankedPlayers(response.data)
    }

    useEffect(() => {
        loadTopRankedPlayers()
    }, [])

    const getPlayerPicture = (playerPicture: string) => {
        return playerPicture.replaceAll('FORMATO', '220x220')
    }

    const formatNumber = (number: number) => {
        return new Intl.NumberFormat('pt-BR').format(number)
    }

    const getPlayerPrice = (playerId: number) => {
        const player = allPlayers.atletas.find((player) => player.atleta_id === playerId)

        if (player) {
            return formatNumber(player.preco_num)
        }

        return '--'
    }

    return (
        <DefaultTable>
            <thead>
                <tr>
                    <th>#</th>
                    <th>TIME</th>
                    <th>POSIÇÃO</th>
                    <th>JOGADOR</th>
                    <th>PREÇO</th>
                    <th>ESCALAÇÕES</th>
                </tr>
            </thead>
            <tbody>
                {topRankedPlayers.map((topRankedPlayer, index) => (
                    <tr key={topRankedPlayer.Atleta.atleta_id}>
                        <td>{index + 1}º</td>
                        <td>
                            <TeamContainer>
                                <img src={topRankedPlayer.escudo_clube} alt="" />
                                {topRankedPlayer.clube}
                            </TeamContainer>
                        </td>
                        <td>{topRankedPlayer.posicao}</td>
                        <td width="50%">
                            <PlayerContainer>
                                <img src={getPlayerPicture(topRankedPlayer.Atleta.foto)} alt="" />
                                {topRankedPlayer.Atleta.apelido}
                            </PlayerContainer>
                        </td>
                        <td>{getPlayerPrice(topRankedPlayer.Atleta.atleta_id)}</td>
                        <td>{formatNumber(topRankedPlayer.escalacoes)}</td>
                    </tr>
                ))}
            </tbody>
        </DefaultTable>
    )
}
