/* eslint-disable camelcase */
import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, PlayerCapitain, PlayerContainer, TableContainer, TeamContainer } from './styles'
import { X } from 'phosphor-react'
import { UserTeamInfo } from '../../../../components/UserTeamInfo'
import { DefaultTable } from '../../../../components/DefaultTable'
import { useTeamPlayers } from '../../../../hooks/useTeamPlayers'

interface TeamModalProps {
    time_id: number
    nome: string
    nome_cartola: string
    url_escudo_svg: string
}

export function TeamModal({ nome, nome_cartola, time_id, url_escudo_svg }: TeamModalProps) {
    const [allScoredPlayers, teamPlayers] = useTeamPlayers(time_id)
    const { atletas, posicoes, clubes } = allScoredPlayers

    const getPlayerPicture = (playerPicture: string) => {
        return playerPicture?.replaceAll('FORMATO', '220x220')
    }

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Dialog.Title>
                    <UserTeamInfo nome={nome} nome_cartola={nome_cartola} url_escudo_svg={url_escudo_svg} />
                </Dialog.Title>

                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <TableContainer>
                    <DefaultTable title="TITULARES">
                        <thead>
                            <tr>
                                <th>JOGADOR</th>
                                <th>TIME</th>
                                <th>POSIÇÃO</th>
                                <th>PONTUAÇÃO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamPlayers.atletas.map((player) => (
                                <tr key={player.atleta_id}>
                                    <td
                                        width="50%"
                                        style={{
                                            position: 'relative',
                                            zIndex: -1,
                                        }}
                                    >
                                        {player.atleta_id === teamPlayers.capitao_id && (
                                            <PlayerCapitain>
                                                <span>C</span>
                                            </PlayerCapitain>
                                        )}

                                        <PlayerContainer>
                                            <img src={getPlayerPicture(player.foto)} alt="" />
                                            {player.apelido}
                                        </PlayerContainer>
                                    </td>
                                    <td>
                                        <TeamContainer>
                                            <img src={clubes[player.clube_id]?.escudos['30x30']} alt="" />
                                            {clubes[player.clube_id]?.abreviacao}
                                        </TeamContainer>
                                    </td>
                                    <td>{posicoes[player.posicao_id]?.nome}</td>
                                    <td>{atletas[player.atleta_id] ? atletas[player.atleta_id].pontuacao : '--'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </DefaultTable>
                    <DefaultTable title="RESERVAS">
                        <thead>
                            <tr>
                                <th>JOGADOR</th>
                                <th>TIME</th>
                                <th>POSIÇÃO</th>
                                <th>PONTUAÇÃO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamPlayers.reservas.map((player) => (
                                <tr key={player.atleta_id}>
                                    <td width="50%">
                                        <PlayerContainer>
                                            <img src={getPlayerPicture(player.foto)} alt="" />
                                            {player.apelido}
                                        </PlayerContainer>
                                    </td>
                                    <td>
                                        <TeamContainer>
                                            <img src={clubes[player.clube_id]?.escudos['30x30']} alt="" />
                                            {clubes[player.clube_id]?.abreviacao}
                                        </TeamContainer>
                                    </td>
                                    <td>{posicoes[player.posicao_id]?.nome}</td>
                                    <td>{atletas[player.atleta_id] ? atletas[player.atleta_id].pontuacao : '--'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </DefaultTable>
                </TableContainer>
            </Content>
        </Dialog.Portal>
    )
}
