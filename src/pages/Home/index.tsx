/* eslint-disable camelcase */
import { useContext, useEffect, useState } from 'react'
import { apiCartola } from '../../lib/axios'
import * as Dialog from '@radix-ui/react-dialog'

import { DefaultTable } from '../../components/DefaultTable'
import { TeamModal } from './components/TeamModal'
import { UserTeamInfo } from '../../components/UserTeamInfo'
import { MarketStateContext } from '../../contexts/MarketStateContext'

interface RankingProps {
    campeonato: number
    mes: number
    rodada: number
    turno: number
}

interface PointsProps {
    rodada: number
    mes: number
    turno: number
    campeonato: number
    capitao: number
}

interface TeamProps {
    time_id: number
    foto_perfil: string
    nome: string
    nome_cartola: string
    patrimonio: number
    ranking: RankingProps
    pontos: PointsProps
    slug: string
    url_escudo_svg: string
}

interface TeamsProps {
    times: TeamProps[]
}

interface ModalOpenProps {
    time_id: number
    nome: string
    nome_cartola: string
    url_escudo_svg: string
}

export function Home() {
    const { isMarketClosed } = useContext(MarketStateContext)
    const [teams, setTeams] = useState<TeamsProps>({
        times: [],
    })
    const [modalOpen, setModalOpen] = useState(false)
    const [modalProps, setModalProps] = useState<ModalOpenProps>({} as ModalOpenProps)

    /* Trás os valores da liga */
    const loadTeams = async () => {
        const response = await apiCartola.get<TeamsProps>(`auth/liga/${import.meta.env.VITE_LIGA}`, {
            headers: {
                'X-GLB-Token': import.meta.env.VITE_GLBID,
            },
        })

        setTeams(response.data)
    }

    useEffect(() => {
        loadTeams()
    }, [])

    const { times } = teams

    const orderedTeams = times.sort(function (a, b) {
        return a.ranking.campeonato < b.ranking.campeonato ? -1 : a.ranking.campeonato > b.ranking.campeonato ? 1 : 0
    })

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

    return (
        <DefaultTable>
            <thead>
                <tr>
                    <th>TIME</th>
                    <th>JOG. PONTUADOS</th>
                    <th>RODADA</th>
                    <th>TOTAL</th>
                    <th>POSIÇÃO</th>
                </tr>
            </thead>
            <tbody>
                <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
                    {orderedTeams.map((team) => (
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
                            <td>{isMarketClosed ? '0/12' : '--'}</td>
                            <td>{appendData(team.pontos.rodada?.toFixed(2))}</td>
                            <td>{appendData(team.pontos.campeonato)}</td>
                            <td>{`${appendData(team.ranking.campeonato)} º`}</td>
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
    )
}
