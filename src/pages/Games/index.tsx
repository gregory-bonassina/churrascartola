/* eslint-disable camelcase */
import { useCallback, useContext, useEffect, useState } from 'react'
import { GamesTable, TeamContent, TeamsContainer } from './styles'
import { MarketStateContext } from '../../contexts/MarketStateContext'
import { apiCartola } from '../../lib/axios'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface TeamShields {
    '30x30': string
    '45x45': string
    '60x60': string
}

interface Team {
    id: number
    nome: string
    abreviacao: string
    escudos: TeamShields
}

interface Game {
    partida_id: number
    partida_data: string
    clube_casa_id: number
    clube_visitante_id: number
    local: string
    timestamp: number
    clube_casa_posicao: number
    clube_visitante_posicao: number
    placar_oficial_mandante: number
    placar_oficial_visitante: number
}

interface GameDataProps {
    clubes: Team[]
    partidas: Game[]
}

export function Games() {
    const { rodada_atual } = useContext(MarketStateContext)
    const [gamesData, setGamesData] = useState<GameDataProps>({
        clubes: [],
        partidas: [],
    })

    const loadGamesData = useCallback(async () => {
        if (rodada_atual) {
            const response = await apiCartola.get(`partidas/${rodada_atual}`)

            setGamesData(response.data)
        }
    }, [rodada_atual])

    useEffect(() => {
        loadGamesData()
    }, [loadGamesData])

    const { clubes, partidas } = gamesData

    partidas.sort(function (a, b) {
        return a.timestamp < b.timestamp
            ? -1
            : a.timestamp > b.timestamp
            ? 1
            : 0
    })

    const getTeam = (teamId: number) => {
        return clubes[teamId]
    }

    const getTeamShield = (teamId: number) => {
        const team = getTeam(teamId)

        return team?.escudos['30x30']
    }

    const getTeamAbreviation = (teamId: number) => {
        const team = getTeam(teamId)

        return team?.nome
    }

    return (
        <GamesTable>
            <thead>
                <tr>
                    <th>TIMES</th>
                    <th>LOCAL</th>
                    <th>DATA</th>
                </tr>
            </thead>
            <tbody>
                {partidas.map((game) => (
                    <tr key={game.partida_id}>
                        <td width="50%">
                            <TeamsContainer>
                                <TeamContent>
                                    {game.clube_casa_posicao}º
                                    <img
                                        src={getTeamShield(game.clube_casa_id)}
                                        alt=""
                                    />
                                    {getTeamAbreviation(game.clube_casa_id)}
                                    {game.placar_oficial_mandante}
                                </TeamContent>
                                X
                                <TeamContent>
                                    {game.placar_oficial_visitante}
                                    {getTeamAbreviation(
                                        game.clube_visitante_id,
                                    )}
                                    <img
                                        src={getTeamShield(
                                            game.clube_visitante_id,
                                        )}
                                        alt=""
                                    />
                                    {game.clube_visitante_posicao}º
                                </TeamContent>
                            </TeamsContainer>
                        </td>
                        <td>{game.local}</td>
                        <td>
                            {format(
                                new Date(game.timestamp * 1000),
                                'EEEE - dd/MM/yy - H:mm',
                                {
                                    locale: ptBR,
                                },
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </GamesTable>
    )
}
