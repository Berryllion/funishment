import { useMemo } from 'react';
import { createStore, Store } from 'redux';
import * as Actions from './reducer';
import { ActionTypes } from './reducer';

type Decks = {
  "menu": string;
  "name": string;
  "levels": Array<string>;
  "level1"?: Array<string>;
  "level2"?: Array<string>;
  "level3"?: Array<string>;
  "final-card"?: Array<string>;
  "colors": {
    "primary": {
      "main": string,
      "contrastText": string
    },
    "secondary": {
      "main": string
    }
  }
};

export interface ReduxState {
  players: Array<string>;
  decks: {
    selected: Array<string>,
    all: Array<Decks>;
  };
  game: {
    level: number | string,
    levelsAvailable: number,
    cards: {
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
    },
    currentCard: number,
    currentPlayer: number,
  },
  theme: {
    isWildcard: boolean,
    currentTheme: string,
    chosenTheme: string,
  }
}

export let store: Store<ReduxState, ActionTypes> | undefined;

// All decks from https://github.com/jonathan-lph/wnrs (besides sneakyLinkDeck)
// Some have been modified to be more versatile
const mainDeck = require("../decks/standalones/main.json");
// const selfLoveDeck = require("../decks/standalones/selfLove.json");
// const selfReflectionDeck = require("../decks/standalones/selfReflection.json");
// const healingDeck = require("../decks/standalones/healing.json");
// const breakupDeck = require("../decks/standalones/breakup.json");

const innerCircleDeck = require("../decks/expansions/innerCircle.json");
const relationshipDeck = require("../decks/expansions/relationship.json");
const honestDatingDeck = require("../decks/expansions/honestDating.json");
const weedDeck = require("../decks/expansions/weed.json");
const ownItDeck = require("../decks/expansions/ownIt.json");
const sneakyLinkDeck = require("../decks/expansions/sneakyLink.json");

const { red: redTheme } = require("../utils/theme.json");

export const initialState: ReduxState = {
  players: [],
  decks: {
    selected: [],
    all: [
      // standalones
      mainDeck,
      // solo
      // selfLoveDeck,
      // selfReflectionDeck,
      // healingDeck,
      // breakupDeck,

      // expansions
      innerCircleDeck,
      relationshipDeck,
      honestDatingDeck,
      ownItDeck,
      weedDeck,
      sneakyLinkDeck,
    ],
  },
  game: {
    level: 0,
    levelsAvailable: 3,
    cards: {
      level1: [],
      level2: [],
      level3: [],
      finalCard: [],
    },
    currentCard: 0,
    currentPlayer: 0,
  },
  theme: {
    isWildcard: false,
    currentTheme: redTheme,
    chosenTheme: "red",
  }
};

const reducer = (state = initialState, action: ActionTypes) => {
  return Actions.reducer(state, action);
};

function initStore(preloadedState = initialState): Store<ReduxState, ActionTypes> {
  return createStore(reducer, preloadedState) as Store<ReduxState, ActionTypes>;
}

export const initializeStore = (preloadedState: ReduxState): Store<ReduxState, ActionTypes> => {
  let newStore = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    newStore = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  if (typeof window === 'undefined') return newStore;
  if (!store) store = newStore;

  return newStore;
};

export function useStore(newInitialState: ReduxState): Store<ReduxState, ActionTypes> {
  const newStore = useMemo(() => initializeStore(newInitialState), [newInitialState]);
  return newStore;
}
