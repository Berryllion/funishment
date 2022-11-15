import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

/* Types */
export interface PlayerInterface {
  name: string,
  role: string,
}

export interface PlayersStateInterface {
  player1: PlayerInterface,
  player2: PlayerInterface,
}

/* State */
const initialState: PlayersStateInterface = {
  player1: {
    name: "",
    role: "",
  },
  player2: {
    name: "",
    role: "",
  },
}

/* Slice */
export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayer1: (state, action: PayloadAction<PlayerInterface>) => {
      state.player1 = action.payload
    },
    setPlayer2: (state, action: PayloadAction<PlayerInterface>) => {
      state.player2 = action.payload
    },
  },
})

export const {
  setPlayer1,
  setPlayer2,
} = playersSlice.actions

export default playersSlice.reducer
