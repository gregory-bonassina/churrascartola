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
}

interface TeamProps {
    atletas: PlayerProps[]
    reservas: PlayerProps[]
    capitao_id: number
}

export const useTeamPlayers = (time_id: number) => {
    const { allScoredPlayers } = useContext(PlayersContext)
    const [teamPlayers, setTeamPlayers] = useState<TeamProps>({
        atletas: [],
        reservas: [],
        capitao_id: 0,
    })

    useEffect(() => {
        const loadTeamPlayers = async () => {
            const response = await apiCartola.get(`time/id/${time_id}`)

            setTeamPlayers(response.data)
        }

        loadTeamPlayers()
    }, [time_id])

    const sortPlayers = (players: PlayerProps[]) => {
        players?.sort(function (a, b) {
            return a.posicao_id < b.posicao_id ? -1 : a.posicao_id > b.posicao_id ? 1 : 0
        })
    }

    sortPlayers(teamPlayers.atletas)
    sortPlayers(teamPlayers.reservas)

    return [allScoredPlayers, teamPlayers] as const
}
