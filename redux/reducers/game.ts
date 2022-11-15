import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { CardInterface } from './cardPiles'

/* Types */
export interface GameInterface {
  pilesViewOnly: boolean,
}

/* State */
const initialState: GameInterface = {
  pilesViewOnly: true
}

/* Slice */
export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPilesViewOnly: (state, action: PayloadAction<boolean>) => {
      state.pilesViewOnly = action.payload
    },
  },
})

export const {
  setPilesViewOnly,
} = gameSlice.actions

export default gameSlice.reducer
