import { Cycle } from './reduce'

export enum ActionTyper {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_FINISHED = 'MARK_CURRENT_CYCLE_FINISHED',
  DELETE_CURRENT_CYCLE_FINISHED = 'DELETE_CURRENT_CYCLE_FINISHED',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTyper.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function markCurrentCycleFinishedAction() {
  return {
    type: ActionTyper.MARK_CURRENT_CYCLE_FINISHED,
  }
}

export function interruptCurrentCycleAction() {
  return {
    type: ActionTyper.INTERRUPT_CURRENT_CYCLE,
  }
}

export function deleteCurrentCycleFinishedActions(cycleId: string) {
  return {
    type: ActionTyper.DELETE_CURRENT_CYCLE_FINISHED,
    payload: {
      cycleId,
    },
  }
}
