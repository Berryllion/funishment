import { ReduxState } from "..";

/* Actions */
export const SET_SELECTED_DECKS = 'SET_SELECTED_DECKS';

/* Types */
export interface SetDecksAction {
  type: typeof SET_SELECTED_DECKS;
  payload: Array<string>;
}

export type Actions = SetDecksAction;

/* Functions */
export function setDecks(state: ReduxState, action: SetDecksAction): ReduxState {
  sessionStorage.setItem('decks', JSON.stringify(action.payload));
  return {
    ...state,
    decks: {
      ...state.decks,
      selected: action.payload,
    },
  };
}

/* Dispatches */
export const dispatches = [
  {
    action: SET_SELECTED_DECKS,
    function: setDecks,
  },
];
