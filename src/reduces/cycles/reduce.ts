import { produce } from 'immer'

import { ActionTyper } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedData?: Date
  finishedDate?: Date
}

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CycleState, action: any) {
  switch (action.type) {
    case ActionTyper.ADD_NEW_CYCLE:
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id,
      // }
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })

    case ActionTyper.INTERRUPT_CURRENT_CYCLE: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return {
      //         ...cycle,
      //         interruptedData: new Date(),
      //       }
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   activeCycleId: null,
      // }
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )
      if (currentCycleIndex < 0) {
        return state
      }
      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptedData = new Date()
      })
    }
    case ActionTyper.MARK_CURRENT_CYCLE_FINISHED: {
      //   return {
      //     ...state,
      //     cycles: state.cycles.map((cycle) => {
      //       if (cycle.id === state.activeCycleId) {
      //         return {
      //           ...cycle,
      //           finishedDate: new Date(),
      //         }
      //       } else {
      //         return cycle
      //       }
      //     }),
      //     activeCycleId: null,
      //   }
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )
      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }
    default:
      return state
  }
}
