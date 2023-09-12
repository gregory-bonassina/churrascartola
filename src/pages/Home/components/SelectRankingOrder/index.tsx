import { useContext } from 'react'
import { Select } from '../../../../components/Select'
import { TeamsContext } from '../../../../contexts/TeamsContext'

export enum RankingOrders {
    TURN = 'TURNO',
    MONTH = 'MÊS',
    LAST_ROUND = 'ÚLTIMA RODADA',
    PATRIMONY = 'PATRIMÔNIO',
    CHAMPIONSHIP = 'CAMPEONATO',
    ROUND = 'RODADA ATUAL',
}

interface SelectRankingOrderProps {
    isMarketClosed: boolean
}

export function SelectRankingOrder({ isMarketClosed }: SelectRankingOrderProps) {
    const { rankingOrder, handleOrderTeams } = useContext(TeamsContext)

    const rankingOrders = Object.values(RankingOrders).filter((rankingOrder) =>
        !isMarketClosed ? rankingOrder !== RankingOrders.ROUND : true,
    )

    return (
        <Select
            handleSelectItem={handleOrderTeams}
            selectedItem={rankingOrder}
            defaultValue={RankingOrders.CHAMPIONSHIP}
            items={rankingOrders}
        />
    )
}
