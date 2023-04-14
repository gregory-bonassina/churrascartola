/* eslint-disable camelcase */
import { useContext } from 'react'
import { MarketStateCountdown } from '../MarketStateCountdown'

import { MarketStateContainer, MarketStateContent } from './styles'
import { MarketStateContext } from '../../contexts/MarketStateContext'

export function MarketState() {
    const { fechamento, rodada_atual, status_mercado } =
        useContext(MarketStateContext)

    const marketState = status_mercado === 1 ? 'aberto' : 'fechado'

    const zeroPad = (num: number | undefined) => String(num).padStart(2, '0')

    const closeLabel = marketState === 'aberto' ? 'Fecha' : 'Fechou'
    const marketCloseDate = `${zeroPad(fechamento.dia)}/${zeroPad(
        fechamento.mes,
    )}/${fechamento.ano}`
    const marketCloseTime = `${fechamento.hora}:${zeroPad(
        fechamento.minuto,
    )}:00`

    return (
        <MarketStateContainer>
            <MarketStateContent>
                <span>
                    Rodada {rodada_atual} - Mercado {marketState}
                </span>
                <span>
                    {closeLabel} em {marketCloseDate} às {marketCloseTime}
                </span>
                {marketState === 'aberto' && (
                    <MarketStateCountdown
                        closeMarketTimestamp={fechamento.timestamp}
                    />
                )}
            </MarketStateContent>
        </MarketStateContainer>
    )
}
