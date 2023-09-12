import { ReactNode, createContext, useEffect, useState } from 'react'
import { apiCartola } from '../lib/axios'

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

export interface TeamProps {
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

interface TeamsProps {
    times: TeamProps[]
}

interface TeamsContextPropsProps {
    children: ReactNode
}

interface TeamsContextProps {
    times: TeamProps[]
    rankingOrder: string
    handleOrderTeams: (order: string) => void
}

export enum RankingOrders {
    TURN = 'TURNO',
    MONTH = 'MÊS',
    LAST_ROUND = 'ÚLTIMA RODADA',
    PATRIMONY = 'PATRIMÔNIO',
    CHAMPIONSHIP = 'CAMPEONATO',
}

export const TeamsContext = createContext({} as TeamsContextProps)

export function TeamsProvider({ children }: TeamsContextPropsProps) {
    const [teams, setTeams] = useState<TeamsProps>({
        times: [],
    })
    const [rankingOrder, setRankingOrder] = useState(RankingOrders.CHAMPIONSHIP.toString())

    /* Trás os valores da liga */
    const loadTeams = async () => {
        const response = await apiCartola.get<TeamsProps>(`auth/liga/${import.meta.env.VITE_LIGA}`, {
            headers: {
                'X-GLB-Token': import.meta.env.VITE_GLBID,
            },
        })

        setTeams(response.data)
    }

    useEffect(() => {
        loadTeams()
    }, [])

    const { times } = teams

    const handleOrderTeams = (order: string) => {
        const orderedTeams = times.sort(function (a, b) {
            switch (order) {
                case RankingOrders.TURN:
                    return a.ranking.turno < b.ranking.turno ? -1 : a.ranking.turno > b.ranking.turno ? 1 : 0
                case RankingOrders.MONTH:
                    return a.ranking.mes < b.ranking.mes ? -1 : a.ranking.mes > b.ranking.mes ? 1 : 0
                case RankingOrders.LAST_ROUND:
                    return a.ranking.rodada < b.ranking.rodada ? -1 : a.ranking.rodada > b.ranking.rodada ? 1 : 0
                case RankingOrders.PATRIMONY:
                    return a.patrimonio > b.patrimonio ? -1 : a.patrimonio < b.patrimonio ? 1 : 0
                case RankingOrders.CHAMPIONSHIP:
                default:
                    return a.ranking.campeonato < b.ranking.campeonato
                        ? -1
                        : a.ranking.campeonato > b.ranking.campeonato
                        ? 1
                        : 0
            }
        })

        setRankingOrder(order)

        setTeams({
            times: orderedTeams,
        })
    }

    return <TeamsContext.Provider value={{ times, rankingOrder, handleOrderTeams }}>{children}</TeamsContext.Provider>
}
