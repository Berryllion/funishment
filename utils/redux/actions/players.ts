import { ReduxState } from "..";

/* Actions */
export const SET_PLAYERS = 'SET_PLAYERS';

/* Types */
export interface SetPlayersAction {
  type: typeof SET_PLAYERS;
  payload: Array<string>;
}

export type Actions = SetPlayersAction;

/* Functions */
export function setPlayers(state: ReduxState, action: SetPlayersAction): ReduxState {
  sessionStorage.setItem('players', JSON.stringify(action.payload));
  return {
    ...state,
    players: action.payload,
  };
}

/* Dispatches */
export const dispatches = [
  {
    action: SET_PLAYERS,
    function: setPlayers,
  },
];
