'use client'

import { ReactNode, createContext, useEffect, useState } from 'react'
import { apiCartolaAuth } from '../lib/axios'

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
    liga?: {
        total_times_liga?: number
    }
}

interface TeamsContextPropsProps {
    children: ReactNode
}

interface TeamsContextProps {
    times: TeamProps[]
    rankingOrder: string
    page: number
    pageSize: number
    hasPreviousPage: boolean
    hasNextPage: boolean
    isLoading: boolean
    handleOrderTeams: (order: string) => void
    handlePageChange: (page: number) => void
}

export enum RankingOrders {
    TURN = 'TURNO',
    MONTH = 'MÊS',
    LAST_ROUND = 'ÚLTIMA RODADA',
    PATRIMONY = 'PATRIMÔNIO',
    CHAMPIONSHIP = 'CAMPEONATO',
    ROUND = 'RODADA ATUAL',
}

export const TEAMS_PAGE_SIZE = 20

const orderByParam: Record<string, string> = {
    [RankingOrders.TURN]: 'turno',
    [RankingOrders.MONTH]: 'mes',
    [RankingOrders.LAST_ROUND]: 'rodada',
    [RankingOrders.ROUND]: 'rodada',
    [RankingOrders.PATRIMONY]: 'patrimonio',
    [RankingOrders.CHAMPIONSHIP]: 'campeonato',
}

export const TeamsContext = createContext({} as TeamsContextProps)

export function TeamsProvider({ children }: TeamsContextPropsProps) {
    const [teams, setTeams] = useState<TeamsProps>({
        times: [],
    })
    const [rankingOrder, setRankingOrder] = useState(RankingOrders.CHAMPIONSHIP.toString())
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    /* Trás os valores da liga já ordenados e paginados pela API */
    useEffect(() => {
        let isCurrent = true

        setIsLoading(true)

        apiCartolaAuth(`auth/liga/${process.env.NEXT_PUBLIC_LIGA}?orderBy=${orderByParam[rankingOrder]}&page=${page}`)
            .then((response) => {
                if (isCurrent) {
                    setTeams(response.data)
                }
            })
            .catch(() => {})
            .finally(() => {
                if (isCurrent) {
                    setIsLoading(false)
                }
            })

        return () => {
            isCurrent = false
        }
    }, [rankingOrder, page])

    const { times, liga } = teams

    const totalTeams = liga?.total_times_liga
    const hasPreviousPage = page > 1
    const hasNextPage = totalTeams ? page * TEAMS_PAGE_SIZE < totalTeams : times.length >= TEAMS_PAGE_SIZE

    const handleOrderTeams = (order: string) => {
        setPage(1)
        setRankingOrder(order)
    }

    const handlePageChange = (newPage: number) => {
        setPage(Math.max(1, newPage))
    }

    return (
        <TeamsContext.Provider
            value={{
                times,
                rankingOrder,
                page,
                pageSize: TEAMS_PAGE_SIZE,
                hasPreviousPage,
                hasNextPage,
                isLoading,
                handleOrderTeams,
                handlePageChange,
            }}
        >
            {children}
        </TeamsContext.Provider>
    )
}
