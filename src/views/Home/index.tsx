'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useContext, useState } from 'react'

import { DefaultTable } from '../../components/DefaultTable'
import { UserTeamInfo } from '../../components/UserTeamInfo'
import { MarketStateContext } from '../../contexts/MarketStateContext'
import { TeamProps, TeamsContext } from '../../contexts/TeamsContext'
import { RankingOrders, SelectRankingOrder } from './components/SelectRankingOrder'
import { Pagination } from './styles'
import { TeamModal } from './components/TeamModal'

interface ModalOpenProps {
    time_id: number
    nome: string
    nome_cartola: string
    url_escudo_svg: string
}

export function Home() {
    const { isMarketClosed } = useContext(MarketStateContext)
    const { times, rankingOrder, page, pageSize, hasPreviousPage, hasNextPage, isLoading, handlePageChange } =
        useContext(TeamsContext)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalProps, setModalProps] = useState<ModalOpenProps>({} as ModalOpenProps)

    const appendData = (data: number | string) => {
        return data || '--'
    }

    const handleOpenModal = ({ nome, nome_cartola, time_id, url_escudo_svg }: ModalOpenProps) => {
        if (isMarketClosed) {
            setModalProps({
                nome,
                nome_cartola,
                time_id,
                url_escudo_svg,
            })
            setModalOpen(true)
        }
    }

    const getRanking = (team: TeamProps) => {
        switch (rankingOrder) {
            case RankingOrders.TURN:
                return team.pontos.turno
            case RankingOrders.MONTH:
                return team.pontos.mes
            case RankingOrders.LAST_ROUND:
            case RankingOrders.ROUND:
                return team.pontos.rodada?.toFixed(2)
            case RankingOrders.PATRIMONY:
                return team.patrimonio
            case RankingOrders.CHAMPIONSHIP:
            default:
                return team.pontos.campeonato
        }
    }

    const pagination = (
        <Pagination>
            <button disabled={!hasPreviousPage || isLoading} onClick={() => handlePageChange(page - 1)}>
                Anterior
            </button>
            <span>Página {page}</span>
            <button disabled={!hasNextPage || isLoading} onClick={() => handlePageChange(page + 1)}>
                Próxima
            </button>
        </Pagination>
    )

    return (
        <>
            {pagination}
            <DefaultTable>
                <thead>
                    <tr>
                        <th>TIME</th>
                        {isMarketClosed && <th>JOG. PONTUADOS</th>}
                        {isMarketClosed && <th>RODADA</th>}
                        <th>
                            <SelectRankingOrder isMarketClosed={isMarketClosed} />
                        </th>
                        <th>POSIÇÃO</th>
                    </tr>
                </thead>
                <tbody>
                    <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
                        {times.map((team, index) => (
                            <tr
                                onClick={() =>
                                    handleOpenModal({
                                        nome: team.nome,
                                        nome_cartola: team.nome_cartola,
                                        time_id: team.time_id,
                                        url_escudo_svg: team.url_escudo_svg,
                                    })
                                }
                                key={team.time_id}
                                style={{ cursor: isMarketClosed ? 'pointer' : 'default' }}
                            >
                                <td width="50%">
                                    <UserTeamInfo
                                        nome={team.nome}
                                        nome_cartola={team.nome_cartola}
                                        url_escudo_svg={team.url_escudo_svg}
                                    />
                                </td>
                                {isMarketClosed && <td>{'0/12'}</td>}
                                {isMarketClosed && <td>{appendData(team.pontos.rodada?.toFixed(2))}</td>}
                                <td>{appendData(getRanking(team))}</td>
                                <td width="5%">{`${(page - 1) * pageSize + index + 1} º`}</td>
                            </tr>
                        ))}
                        {modalOpen && (
                            <TeamModal
                                time_id={modalProps.time_id}
                                nome={modalProps.nome}
                                nome_cartola={modalProps.nome_cartola}
                                url_escudo_svg={modalProps.url_escudo_svg}
                            />
                        )}
                    </Dialog.Root>
                </tbody>
            </DefaultTable>
            {pagination}
        </>
    )
}
