/* eslint-disable camelcase */
import * as Select from '@radix-ui/react-select'
import { useContext } from 'react'

import { MarketStateContext, MarketStatesNames } from '../../contexts/MarketStateContext'

import { zeroPadStart } from '../../util/padUtil'
import { MarketStateCountdown } from '../MarketStateCountdown'
import {
    MarketStateContainer,
    MarketStateContent,
    SelectContent,
    SelectItem,
    SelectItemIndicator,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectViewPort,
} from './styles'
import { CaretDown, CaretUp, Check } from 'phosphor-react'

const MarketStateCloseTypes = {
    CLOSE: 'Fecha',
    CLOSED: 'Fechou',
}

export function MarketState() {
    const { fechamento, rodada_atual, status_mercado, isMarketClosed } = useContext(MarketStateContext)

    const marketState = MarketStatesNames[status_mercado]

    const closeLabel = !isMarketClosed ? MarketStateCloseTypes.CLOSE : MarketStateCloseTypes.CLOSED

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
                {!isMarketClosed && <MarketStateCountdown closeMarketTimestamp={fechamento.timestamp} />}
                <Select.Root>
                    <SelectTrigger>
                        <Select.Value placeholder={`Rodada ${rodada_atual}`} />
                        <Select.Icon>
                            <CaretDown size={20} />
                        </Select.Icon>
                    </SelectTrigger>

                    <Select.Portal>
                        <SelectContent>
                            <Select.ScrollUpButton>
                                <CaretUp size={20} />
                            </Select.ScrollUpButton>
                            <SelectViewPort>
                                <Select.Group>
                                    <SelectLabel>Rodadas</SelectLabel>
                                    <SelectSeparator />
                                    <SelectItem value="teste1">
                                        <Select.ItemText>teste1</Select.ItemText>
                                        <SelectItemIndicator>
                                            <Check size={15} />
                                        </SelectItemIndicator>
                                    </SelectItem>

                                    <SelectItem value="teste2">
                                        <Select.ItemText>teste2</Select.ItemText>
                                        <SelectItemIndicator>
                                            <Check size={15} />
                                        </SelectItemIndicator>
                                    </SelectItem>
                                </Select.Group>
                            </SelectViewPort>
                            <Select.ScrollDownButton>
                                <CaretDown size={20} />
                            </Select.ScrollDownButton>
                            <Select.Arrow />
                        </SelectContent>
                    </Select.Portal>
                </Select.Root>
            </MarketStateContent>
        </MarketStateContainer>
    )
}
