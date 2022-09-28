import { useEffect, useState } from 'react'
import { apiCartola } from '../../lib/axios'
import { HomeContainer } from './styles'

interface RankingProps {
    campeonato: number
    mes: number
    rodada: number
    turno: number
}

interface TeamProps {
    time_id: number
    foto_perfil: string
    nome: string
    nome_cartola: string
    patrimonio: number
    ranking: RankingProps
    slug: string
    url_escudo_svg: string
}

export function Home() {
    const [teams, setTeams] = useState<TeamProps[]>([])

    const loadTeams = async () => {
        const response = await apiCartola.get('auth/liga/copa-churrasco-2022', {
            headers: {
                'X-GLB-Token': import.meta.env.VITE_GLBID,
            },
        })

        // console.log(response.data.times)

        setTeams(response.data.times)
    }

    useEffect(() => {
        loadTeams()
    }, [])

    return (
        <HomeContainer>
            {teams.map((team) => (
                <div key={team.time_id}>{team.nome}</div>
            ))}
        </HomeContainer>
    )
}
