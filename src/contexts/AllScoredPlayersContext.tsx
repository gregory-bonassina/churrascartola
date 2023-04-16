import { ReactNode, createContext, useEffect, useState } from 'react'
import { apiCartola } from '../lib/axios'

interface PlayerProps {
    apelido: string
    foto: string
    pontuacao: number
    posicao_id: number
    clube_id: number
    entrou_em_campo: boolean
}

interface PostitionsProps {
    id: number
    nome: string
    abreviacao: string
}

interface TeamShields {
    '30x30': string
    '45x45': string
    '60x60': string
}

interface TeamsProps {
    id: number
    nome: string
    abreviacao: string
    escudos: TeamShields
}

interface AllScoredPlayersProps {
    atletas: PlayerProps[]
    posicoes: PostitionsProps[]
    clubes: TeamsProps[]
}

interface AllScoredPlayersProviderProps {
    children: ReactNode
}

export const AllScoredPlayersContext = createContext(
    {} as AllScoredPlayersProps,
)

export function AllScoredPlayersProvider({
    children,
}: AllScoredPlayersProviderProps) {
    const [allScoredPlayers, setAllScoredPlayers] =
        useState<AllScoredPlayersProps>({
            atletas: [],
            posicoes: [],
            clubes: [],
        })

    const loadAllScoredPlayers = async () => {
        const response = await apiCartola.get('atletas/pontuados')

        setAllScoredPlayers(response.data)
    }

    useEffect(() => {
        loadAllScoredPlayers()
    }, [])

    return (
        <AllScoredPlayersContext.Provider value={allScoredPlayers}>
            {children}
        </AllScoredPlayersContext.Provider>
    )
}
