/* eslint-disable camelcase */
import { useContext, useEffect, useState } from 'react'
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

export const useTeamPlayers = (time_id: number) => {
    const { allScoredPlayers } = useContext(PlayersContext)
    const [teamPlayers, setTeamPlayers] = useState<TeamProps>({
        atletas: [],
        reservas: [],
        capitao_id: 0,
    })
    const [substituitions, setSubstituitions] = useState<SubstitutionsProps[]>([])

    useEffect(() => {
        const loadTeamPlayers = async () => {
            const response = await apiCartola.get(`time/id/${time_id}`)

            setTeamPlayers(response.data)
        }

        const loadSubstituitions = async () => {
            const response = await apiCartola.get(`time/substituicoes/${time_id}`)

            const data = response.data

            if (data) {
                setSubstituitions(data)
            }
        }

        loadTeamPlayers()
        loadSubstituitions()
    }, [time_id])

    teamPlayers.atletas = teamPlayers.atletas.map((atleta) => {
        const subs = substituitions.find((substituition) => substituition.saiu.atleta_id === atleta.atleta_id)

        if (subs) {
            return { ...subs.entrou, entrou: true }
        }

        return atleta
    })

    teamPlayers.reservas = teamPlayers.reservas?.map((atleta) => {
        const subs = substituitions.find((substituition) => substituition.entrou.atleta_id === atleta.atleta_id)

        if (subs) {
            return { ...subs.saiu, saiu: true }
        }

        return atleta
    })

    const sortPlayers = (players: PlayerProps[]) => {
        players?.sort(function (a, b) {
            return a.posicao_id < b.posicao_id ? -1 : a.posicao_id > b.posicao_id ? 1 : 0
        })
    }

    sortPlayers(teamPlayers.atletas)
    sortPlayers(teamPlayers.reservas)

    return [allScoredPlayers, teamPlayers] as const
}
