import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import _ from "lodash"

import { shuffleArray } from '../../utils/array-manipulation'

/* Types */
export interface CardInterface {
  type: string,
  title: string,
  points: number | null,
  description: string,
  specialItems?: Array<{
    type: string,
    items: Array<string>,
  }>,
  index?: number,
}

export interface CardPilesInterface {
  currentCard: CardInterface | null,
  hardLimits: Array<CardInterface>,
  softLimits: Array<CardInterface>,
  discardPile: Array<CardInterface>,
  newRulesPile: Array<CardInterface>,
  stockPile: Array<CardInterface>,
}

/* State */
const initialState: CardPilesInterface = {
  currentCard: null,
  hardLimits: [],
  softLimits: [],
  discardPile: [],
  newRulesPile: [],
  stockPile: [],
}

/* Slice */
export const cardPilesSlice = createSlice({
  name: "cardPiles",
  initialState,
  reducers: {
    fillStockPile: (state, action: PayloadAction<Array<CardInterface>>) => {
      state.stockPile = action.payload
    },
    setCurrentCard: (state, action: PayloadAction<CardInterface>) => {
      state.currentCard = action.payload
    },
    stockToDiscard: (state) => {
      let stockPileCopy = [ ...state.stockPile ]
      let discardPileCopy = [ ...state.discardPile ]

      const removedCard = stockPileCopy.splice(0, 1)[0]
      discardPileCopy.push(removedCard)

      state.stockPile = stockPileCopy
      state.discardPile = discardPileCopy
      state.currentCard = stockPileCopy[0]
    },
    stockToPlay: (state, action: PayloadAction<number>) => {
      let stockPileCopy = [ ...state.stockPile ]

      const removedCard = stockPileCopy.splice(action.payload, 1)[0]

      state.currentCard = removedCard
      state.stockPile = stockPileCopy
    },
    stockToSoftLimits: (state) => {
      let stockPileCopy = [ ...state.stockPile ]
      let softLimitsCopy = [ ...state.softLimits ]

      const removedCard = stockPileCopy.splice(0, 1)[0]
      softLimitsCopy.push(removedCard)

      state.stockPile = stockPileCopy
      state.softLimits = softLimitsCopy
      state.currentCard = stockPileCopy[0]
    },
    stockToHardLimits: (state) => {
      let stockPileCopy = [ ...state.stockPile ]
      let hardLimitsCopy = [ ...state.hardLimits ]

      const removedCard = stockPileCopy.splice(0, 1)[0]
      hardLimitsCopy.push(removedCard)

      state.stockPile = stockPileCopy
      state.hardLimits = hardLimitsCopy
      state.currentCard = stockPileCopy[0]
    },
    stockToNewRules: (state) => {
      let stockPileCopy = [ ...state.stockPile ]
      let newRulesPileCopy = [ ...state.newRulesPile ]

      const removedCard = stockPileCopy.splice(0, 1)[0]
      newRulesPileCopy.push(removedCard)

      state.stockPile = stockPileCopy
      state.newRulesPile = newRulesPileCopy
      state.currentCard = stockPileCopy[0]
    },
    softLimitsToHardLimits: (state, action: PayloadAction<number>) => {
      let softLimitsCopy = [ ...state.softLimits ]
      let hardLimitsCopy = [ ...state.hardLimits ]

      const removedCard = softLimitsCopy.splice(action.payload, 1)[0]
      hardLimitsCopy.push(removedCard)

      state.softLimits = softLimitsCopy
      state.hardLimits = hardLimitsCopy
    },
    softLimitsToStock: (state, action: PayloadAction<number>) => {
      let softLimitsCopy = [ ...state.softLimits ]
      let stockPileCopy = [ ...state.stockPile ]

      const removedCard = softLimitsCopy.splice(action.payload, 1)[0]
      stockPileCopy.push(removedCard)

      state.softLimits = softLimitsCopy
      state.stockPile = shuffleArray(stockPileCopy)
    },
    allNewRulesToStock: (state) => {
      let stockPileCopy = [ ...state.stockPile ]
      let discardPileCopy = [ ...state.discardPile ]

      const removeCurrentCard = stockPileCopy.splice(0, 1)[0]
      discardPileCopy.push(removeCurrentCard)

      let newStockPile = [ ...stockPileCopy, ...state.newRulesPile ]

      newStockPile = shuffleArray(newStockPile)

      state.stockPile = newStockPile
      state.newRulesPile = []
      state.discardPile = discardPileCopy
      state.currentCard = newStockPile[0]
    },
    allDiscardToStock: (state) => {
      let stockPileCopy = [ ...state.stockPile ]

      const removedCard = stockPileCopy.splice(0, 1)[0]

      let newStockPile = [ ...stockPileCopy, ...state.discardPile ]

      newStockPile = shuffleArray(newStockPile)

      state.stockPile = newStockPile
      state.discardPile = [ removedCard ]
      state.currentCard = newStockPile[0]
    },
    newRulesToDiscard: (state, action: PayloadAction<number>) => {
      let discardPileCopy = [ ...state.discardPile ]
      let newRulesPileCopy = [ ...state.newRulesPile ]
      let stockPileCopy = [ ...state.stockPile ]

      const removedCard = newRulesPileCopy.splice(action.payload, 1)[0]
      discardPileCopy.push(removedCard)

      const nextCurrentCard = stockPileCopy.splice(0, 2)[1]

      state.discardPile = discardPileCopy
      state.newRulesPile = newRulesPileCopy
      state.currentCard = nextCurrentCard
      state.stockPile = stockPileCopy
    },
    discardToPlay: (state, action: PayloadAction<number>) => {
      let discardPileCopy = [ ...state.discardPile ]

      const removedCard = discardPileCopy.splice(action.payload, 1)[0]

      state.currentCard = removedCard
      state.discardPile = discardPileCopy
    },
    queueDiscardToPlay: (state, action: PayloadAction<Array<number>>) => {
      let discardPileCopy = [ ...state.discardPile ]
      let stockPileCopy = [ ...state.stockPile ]

      const removeCurrentCard = stockPileCopy.splice(0, 1)[0]
      const removedCards = _.pullAt(discardPileCopy, action.payload)

      state.discardPile = [ ...discardPileCopy, removeCurrentCard ]
      state.stockPile = [ ...removedCards, ...stockPileCopy]
      state.currentCard = removedCards[0]
    },
  },
})

export const {
  fillStockPile,
  setCurrentCard,
  stockToDiscard,
  stockToPlay,
  stockToSoftLimits,
  stockToHardLimits,
  stockToNewRules,
  softLimitsToHardLimits,
  softLimitsToStock,
  allNewRulesToStock,
  allDiscardToStock,
  newRulesToDiscard,
  discardToPlay,
  queueDiscardToPlay,
} = cardPilesSlice.actions

export default cardPilesSlice.reducer
