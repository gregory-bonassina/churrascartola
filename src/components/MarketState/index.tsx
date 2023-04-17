/* eslint-disable camelcase */
import { useContext } from 'react'
import { MarketStateContext } from '../../contexts/MarketStateContext'

import { MarketStateCountdown } from '../MarketStateCountdown'
import { zeroPadStart } from '../../util/padUtil'
import { MarketStateContainer, MarketStateContent } from './styles'

const MarketStateTypes = {
    Open: 'aberto',
    Close: 'fechado',
}

const MarketStateCloseTypes = {
    Close: 'Fecha',
    Closed: 'Fechou',
}

export function MarketState() {
    const { fechamento, rodada_atual, status_mercado } = useContext(MarketStateContext)

    const marketState = status_mercado === 1 ? MarketStateTypes.Open : MarketStateTypes.Close

    const closeLabel =
        marketState === MarketStateTypes.Open ? MarketStateCloseTypes.Close : MarketStateCloseTypes.Closed

    const marketCloseDate = `${zeroPadStart(fechamento.dia)}/${zeroPadStart(fechamento.mes)}/${fechamento.ano}`
    const marketCloseTime = `${fechamento.hora}:${zeroPadStart(fechamento.minuto)}:00`

    return (
        <MarketStateContainer>
            <MarketStateContent>
                <span>
                    Rodada {rodada_atual} - Mercado {marketState}
                </span>
                <span>
                    {closeLabel} em {marketCloseDate} às {marketCloseTime}
                </span>
                {marketState === MarketStateTypes.Open && (
                    <MarketStateCountdown closeMarketTimestamp={fechamento.timestamp} />
                )}
            </MarketStateContent>
        </MarketStateContainer>
    )
}
