/* eslint-disable camelcase */
import { useContext } from 'react'
import { MarketStateContext, MarketStates, MarketStatesNames } from '../../contexts/MarketStateContext'

import { MarketStateCountdown } from '../MarketStateCountdown'
import { zeroPadStart } from '../../util/padUtil'
import { MarketStateContainer, MarketStateContent } from './styles'

const MarketStateCloseTypes = {
    CLOSE: 'Fecha',
    CLOSED: 'Fechou',
}

export function MarketState() {
    const { fechamento, rodada_atual, status_mercado } = useContext(MarketStateContext)

    const marketState = MarketStatesNames[status_mercado]

    const closeLabel = status_mercado === MarketStates.OPEN ? MarketStateCloseTypes.CLOSE : MarketStateCloseTypes.CLOSED

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
                {status_mercado === MarketStates.OPEN && (
                    <MarketStateCountdown closeMarketTimestamp={fechamento.timestamp} />
                )}
            </MarketStateContent>
        </MarketStateContainer>
    )
}
