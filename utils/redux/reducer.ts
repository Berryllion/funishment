import { ReduxState } from '.';
import * as Players from './actions/players';
import * as SelectedDecks from './actions/selectedDecks';
import * as Game from './actions/game';
import * as Theme from './actions/theme';

export type ActionTypes =
  Players.Actions | SelectedDecks.Actions | Game.Actions |
  Theme.Actions; // | New.Actions

export interface Dispatch {
  action: string,
  function: (state: ReduxState, action: ActionTypes) => ReduxState
};

const allDispatches: Array<Dispatch> = [
  Players.dispatches,
  SelectedDecks.dispatches,
  Game.dispatches,
  Theme.dispatches,
  // @ts-ignore
].flat();

export function reducer(state: ReduxState, action: ActionTypes) {
  const dispatchAction = allDispatches.find((e) => e?.action === action.type);

  if (dispatchAction)
    return dispatchAction.function(state, action);
  else
    return state;
}
