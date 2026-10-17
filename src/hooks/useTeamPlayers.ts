'use client'

import { useContext, useEffect, useMemo, useState } from 'react'
import { PlayersContext } from '../contexts/PlayersContext'
import { apiCartola } from '../lib/axios'

interface PlayerProps {
    atleta_id: number
    clube_id: number
    posicao_id: number
    status_id: number
    apelido: string
    foto: string
    entrou: boolean
    saiu: boolean
}

interface TeamProps {
    atletas: PlayerProps[]
    reservas: PlayerProps[]
    capitao_id: number
}

interface SubstitutionsProps {
    entrou: PlayerProps
    saiu: PlayerProps
}

const sortPlayers = (players: PlayerProps[]) => {
    return [...players].sort(function (a, b) {
        return a.posicao_id < b.posicao_id ? -1 : a.posicao_id > b.posicao_id ? 1 : 0
    })
}

export const useTeamPlayers = (time_id: number) => {
    const { allScoredPlayers } = useContext(PlayersContext)
    const [loadedTeam, setLoadedTeam] = useState<TeamProps>({
        atletas: [],
        reservas: [],
        capitao_id: 0,
    })
    const [substituitions, setSubstituitions] = useState<SubstitutionsProps[]>([])

    useEffect(() => {
        let ignore = false

        const loadTeamPlayers = async () => {
            const response = await apiCartola.get(`time/id/${time_id}`)

            if (!ignore) {
                setLoadedTeam(response.data)
            }
        }

        const loadSubstituitions = async () => {
            const response = await apiCartola.get(`time/substituicoes/${time_id}`)

            const data = response.data

            if (data && !ignore) {
                setSubstituitions(data)
            }
        }

        loadTeamPlayers().catch(() => {})
        loadSubstituitions().catch(() => {})

        return () => {
            ignore = true
        }
    }, [time_id])

    const teamPlayers = useMemo<TeamProps>(() => {
        const atletas = (loadedTeam.atletas ?? []).map((atleta) => {
            const subs = substituitions.find((substituition) => substituition.saiu.atleta_id === atleta.atleta_id)

            return subs ? { ...subs.entrou, entrou: true } : atleta
        })

        const reservas = (loadedTeam.reservas ?? []).map((atleta) => {
            const subs = substituitions.find((substituition) => substituition.entrou.atleta_id === atleta.atleta_id)

            return subs ? { ...subs.saiu, saiu: true } : atleta
        })

        return {
            ...loadedTeam,
            atletas: sortPlayers(atletas),
            reservas: sortPlayers(reservas),
        }
    }, [loadedTeam, substituitions])

    return [allScoredPlayers, teamPlayers] as const
}
