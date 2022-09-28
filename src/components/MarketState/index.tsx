import { useCallback, useEffect, useState } from 'react'
import { apiCartola } from '../../lib/axios'
import { MarketStateCountdown } from '../MarketStateCountdown'

import { MarketStateContainer, MarketStateContent } from './styles'

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

export function MarketState() {
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

    const marketState = market.status_mercado === 1 ? 'aberto' : 'fechado'

    const zeroPad = (num: number | undefined) => String(num).padStart(2, '0')

    const closeLabel = marketState === 'aberto' ? 'Fecha' : 'Fechou'
    const marketCloseDate = `${zeroPad(market.fechamento.dia)}/${zeroPad(
        market.fechamento.mes,
    )}/${market.fechamento.ano}`
    const marketCloseTime = `${market.fechamento.hora}:${market.fechamento.minuto}:00`

    return (
        <MarketStateContainer>
            <MarketStateContent>
                <span>
                    Rodada {market.rodada_atual} - Mercado {marketState}
                </span>
                <span>
                    {closeLabel} em {marketCloseDate} às {marketCloseTime}
                </span>
                {marketState === 'aberto' && (
                    <MarketStateCountdown
                        closeMarketTimestamp={market.fechamento.timestamp}
                    />
                )}
            </MarketStateContent>
        </MarketStateContainer>
    )
}
