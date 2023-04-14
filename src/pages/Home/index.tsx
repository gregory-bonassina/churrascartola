import { useEffect, useState } from 'react'
import { apiCartola } from '../../lib/axios'
import {
    AvatarContainer,
    HomeContainer,
    NamesContainer,
    TeamsTable,
    UserContainer,
} from './styles'

interface RankingProps {
    campeonato: number
    mes: number
    rodada: number
    turno: number
}

interface PointsProps {
    rodada: number
    mes: number
    turno: number
    campeonato: number
    capitao: number
}

interface TeamProps {
    time_id: number
    foto_perfil: string
    nome: string
    nome_cartola: string
    patrimonio: number
    ranking: RankingProps
    pontos: PointsProps
    slug: string
    url_escudo_svg: string
}

interface LeagueDataProps {
    times: TeamProps[]
}

interface PlayerScored {
    playerId: {
        nickname: string
        photoUrl: string
        score: number
        positionId: number
        teamId: number
        played: boolean
    }
}

interface PlayersScoredProps {
    atletas: PlayerScored[]
}

interface PlayerProps {
    atleta_id: number
    clube_id: number
    posicao_id: number
    status_id: number
    nickname: string
    name: string
    photoUrl: string
}

interface TeamsPlayersProps {
    atletas: PlayerProps[]
    reservas: PlayerProps[]
}

export function Home() {
    const [leagueData, setLeagueData] = useState<LeagueDataProps>({
        times: [],
    })
    const [playersScored, setPlayersScored] = useState<PlayersScoredProps>({
        atletas: [],
    })
    // eslint-disable-next-line no-unused-vars
    const [teamsPlayers, setTeamsPlayers] = useState<TeamsPlayersProps[]>([])

    /* Trás os valores da liga */
    const loadLeagueData = async () => {
        const response = await apiCartola.get<LeagueDataProps>(
            `auth/liga/${import.meta.env.VITE_LIGA}`,
            {
                headers: {
                    'X-GLB-Token': import.meta.env.VITE_GLBID,
                },
            },
        )

        const data = response.data

        setLeagueData(data)

        data.times.forEach((team) => {
            fetchTeam(team.time_id)
        })
    }

    /* Trás as escalações dos times na rodada */
    const fetchTeam = async (teamId: number) => {
        const response = await apiCartola.get<TeamsPlayersProps>(
            `time/id/${teamId}`,
        )

        setTeamsPlayers((prevState) => [...prevState, response.data])
    }

    /* Trás os jogadores que jogaram/pontuaram na rodada */
    const loadPlayersScored = async () => {
        const response = await apiCartola.get<PlayersScoredProps>(
            'atletas/pontuados',
        )

        setPlayersScored(response.data)
    }

    useEffect(() => {
        loadLeagueData()
        loadPlayersScored()
    }, [])

    const { times } = leagueData

    // eslint-disable-next-line no-unused-vars
    const { atletas } = playersScored

    const orderedTeams = times.sort(function (a, b) {
        return a.ranking.campeonato < b.ranking.campeonato
            ? -1
            : a.ranking.campeonato > b.ranking.campeonato
            ? 1
            : 0
    })

    console.log(orderedTeams)

    return (
        <HomeContainer>
            <TeamsTable>
                <thead>
                    <tr>
                        <th>TIME</th>
                        <th>JOG. PONTUADOS</th>
                        <th>RODADA</th>
                        <th>TOTAL</th>
                        <th>POSIÇÃO</th>
                    </tr>
                </thead>
                <tbody>
                    {orderedTeams.map((team) => (
                        <tr key={team.time_id}>
                            <td width="50%">
                                <UserContainer>
                                    <AvatarContainer>
                                        <img src={team.url_escudo_svg} alt="" />
                                    </AvatarContainer>
                                    <NamesContainer>
                                        <strong>{team.nome}</strong>
                                        <span>{team.nome_cartola}</span>
                                    </NamesContainer>
                                </UserContainer>
                            </td>
                            <td>0/12</td>
                            <td>{team.pontos.rodada?.toFixed(2)}</td>
                            <td>{team.pontos.campeonato}</td>
                            <td>{team.ranking.campeonato}º</td>
                        </tr>
                    ))}
                </tbody>
            </TeamsTable>
        </HomeContainer>
    )
}
