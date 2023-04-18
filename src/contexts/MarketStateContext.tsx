import { ReactNode, createContext, useCallback, useEffect, useState } from 'react'
import { apiCartola } from '../lib/axios'

interface MarketCloseProps {
    dia: number
    mes: number
    ano: number
    hora: number
    minuto: number
    timestamp: number
}

interface MarketStateProps {
    rodada_atual: number
    status_mercado: number
    fechamento: MarketCloseProps
}

interface MarketStateProviderProps {
    children: ReactNode
}

export const MarketStatesNames = ['fechado', 'aberto']

export const MarketStates = {
    CLOSED: 0,
    OPEN: 1,
}

export const MarketStateContext = createContext({} as MarketStateProps)

export function MarketStateProvider({ children }: MarketStateProviderProps) {
    const [market, setMarket] = useState<MarketStateProps>({
        rodada_atual: 0,
        status_mercado: 0,
        fechamento: {
            dia: 1,
            mes: 1,
            ano: 2022,
            hora: 0,
            minuto: 0,
            timestamp: 0,
        },
    })

    const loadMarket = useCallback(async () => {
        const response = await apiCartola.get('mercado/status')
        setMarket(response.data)
    }, [])

    useEffect(() => {
        loadMarket()
    }, [loadMarket])

    return <MarketStateContext.Provider value={market}>{children}</MarketStateContext.Provider>
}
