import { ReduxState } from "..";

/* Actions */
export const SET_GAME_LEVEL = 'SET_GAME_LEVEL';
export const SET_GAME_LEVELS_AVAILABLE = 'SET_GAME_LEVELS_AVAILABLE';
export const SET_CARDS_AVAILABLE = 'SET_CARDS_AVAILABLE';
export const SET_CURRENT_CARD = 'SET_CURRENT_CARD';
export const SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER';

/* Types */
export interface SetGameAction {
  type: typeof SET_GAME_LEVEL;
  payload: number;
}
export interface SetGameLevelsAvailableAction {
  type: typeof SET_GAME_LEVELS_AVAILABLE;
  payload: number;
}
export interface SetCardsAvailableAction {
  type: typeof SET_CARDS_AVAILABLE;
  payload: {
    level1: Array<{
        deck: string,
        card: string,
      }>,
      level2: Array<{
        deck: string,
        card: string,
      }>,
      level3: Array<{
        deck: string,
        card: string,
      }>,
      finalCard: Array<{
        deck: string,
        card: string,
      }>,
  };
}
export interface SetCurrentCardAction {
  type: typeof SET_CURRENT_CARD;
  payload: number;
}
export interface SetCurrentPlayerAction {
  type: typeof SET_CURRENT_CARD;
  payload: number;
}

export type Actions = SetGameAction | SetGameLevelsAvailableAction |
  SetCardsAvailableAction | SetCurrentCardAction | SetCurrentPlayerAction;

/* Functions */
export function setGameLevel(state: ReduxState, action: SetGameAction): ReduxState {
  sessionStorage.setItem('level', JSON.stringify(action.payload));
  return {
    ...state,
    game: {
      ...state.game,
      level: action.payload,
      currentCard: 0,
    },
  };
}
export function setGameLevelsAvailable(state: ReduxState, action: SetGameLevelsAvailableAction): ReduxState {
  return {
    ...state,
    game: {
      ...state.game,
      levelsAvailable: action.payload,
    },
  };
}
export function setCardsAvailable(state: ReduxState, action: SetCardsAvailableAction): ReduxState {
  sessionStorage.setItem('cards', JSON.stringify(action.payload));
  return {
    ...state,
    game: {
      ...state.game,
      cards: action.payload,
    },
  };
}

export function setCurrentCard(state: ReduxState, action: SetCurrentCardAction): ReduxState {
  sessionStorage.setItem("currentCard", action.payload.toString());
  return {
    ...state,
    game: {
      ...state.game,
      currentCard: action.payload,
    }
  };
}
export function setCurrentPlayer(state: ReduxState, action: SetCurrentPlayerAction): ReduxState {
  sessionStorage.setItem("currentPlayer", action.payload.toString());
  return {
    ...state,
    game: {
      ...state.game,
      currentPlayer: action.payload,
    }
  };
}

/* Dispatches */
export const dispatches = [
  {
    action: SET_GAME_LEVEL,
    function: setGameLevel,
  },
  {
    action: SET_GAME_LEVELS_AVAILABLE,
    function: setGameLevelsAvailable,
  },
  {
    action: SET_CARDS_AVAILABLE,
    function: setCardsAvailable,
  },
  {
    action: SET_CURRENT_CARD,
    function: setCurrentCard,
  },
  {
    action: SET_CURRENT_PLAYER,
    function: setCurrentPlayer
  }
];
