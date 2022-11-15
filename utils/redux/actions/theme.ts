import { ReduxState } from "..";

const allThemes = require("../../utils/theme.json");

/* Actions */
export const SET_THEME = 'SET_THEME';
export const SET_THEME_IS_WILDCARD = 'SET_THEME_IS_WILDCARD';

/* Types */
export interface SetThemeAction {
  type: typeof SET_THEME;
  payload: string;
}
export interface SetThemeIsWildcardAction {
  type: typeof SET_THEME_IS_WILDCARD;
  payload: boolean;
}

export type Actions = SetThemeAction | SetThemeIsWildcardAction;

/* Functions */
export function setTheme(state: ReduxState, action: SetThemeAction): ReduxState {
  return {
    ...state,
    theme: {
      ...state.theme,
      chosenTheme: action.payload,
      currentTheme: state.theme.isWildcard
        ? state.theme.currentTheme
        : allThemes[action.payload],
    }
  };
}
export function SetThemeIsWildcard(state: ReduxState, action: SetThemeIsWildcardAction): ReduxState {
  return {
    ...state,
    theme: {
      ...state.theme,
      isWildcard: action.payload,
      currentTheme: action.payload && state.theme.chosenTheme !== "black"
        ? allThemes["white"]
        : allThemes[state.theme.chosenTheme],
    }
  };
}

/* Dispatches */
export const dispatches = [
  {
    action: SET_THEME,
    function: setTheme,
  },
  {
    action: SET_THEME_IS_WILDCARD,
    function: SetThemeIsWildcard,
  },
];
