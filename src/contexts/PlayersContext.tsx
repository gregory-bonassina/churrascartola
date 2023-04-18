import { ReactNode, createContext, useEffect, useState } from 'react'
import { apiCartola } from '../lib/axios'

interface PlayerProps {
    atleta_id: number
    preco_num: number
    variacao_num: number
}

interface AllPlayersProps {
    atletas: PlayerProps[]
}

interface PlayerScoredProps {
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
    atletas: PlayerScoredProps[]
    posicoes: PostitionsProps[]
    clubes: TeamsProps[]
}

interface PlayersContextProps {
    allScoredPlayers: AllScoredPlayersProps
    allPlayers: AllPlayersProps
}

interface AllScoredPlayersProviderProps {
    children: ReactNode
}

export const PlayersContext = createContext({} as PlayersContextProps)

export function PlayersProvider({ children }: AllScoredPlayersProviderProps) {
    const [allScoredPlayers, setAllScoredPlayers] = useState<AllScoredPlayersProps>({
        atletas: [],
        posicoes: [],
        clubes: [],
    })

    const [allPlayers, setAllPlayers] = useState<AllPlayersProps>({
        atletas: [],
    })

    const loadAllScoredPlayers = async () => {
        const response = await apiCartola.get('atletas/pontuados')

        setAllScoredPlayers(response.data)
    }

    const loadAllPlayers = async () => {
        const response = await apiCartola.get('atletas/mercado')

        setAllPlayers(response.data)
    }

    useEffect(() => {
        loadAllScoredPlayers()
        loadAllPlayers()
    }, [])

    return <PlayersContext.Provider value={{ allScoredPlayers, allPlayers }}>{children}</PlayersContext.Provider>
}
