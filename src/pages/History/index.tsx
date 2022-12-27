import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { CyclesContext } from '../../contexts/CyclesContext'

import { ButtonTrash, HistoryContainer, HistoryList, Status } from './styles'
import { Trash } from 'phosphor-react'

export function History() {
  const { cycles, deleteCurrentCycle } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>Meu Historico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} mínutos</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {cycle.finishedDate && (
                    <Status statusColor="green">Concluído</Status>
                  )}

                  {cycle.interruptedData && (
                    <Status statusColor="red">Interrompido</Status>
                  )}

                  {!cycle.finishedDate && !cycle.interruptedData && (
                    <Status statusColor="yellow">Em andamento</Status>
                  )}
                </td>
                <td>
                  {cycle.finishedDate || cycle.interruptedData ? (
                    <ButtonTrash
                      type="button"
                      onClick={() => deleteCurrentCycle(cycle.id)}
                    >
                      <Trash size={22} />
                    </ButtonTrash>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
