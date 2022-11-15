import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

/* Types */
export interface ExtensionsInterface {
  xRated: boolean,
}

/* State */
const initialState: ExtensionsInterface = {
  xRated: false,
}

/* Slice */
export const extensionsSlice = createSlice({
  name: "extensions",
  initialState,
  reducers: {
    setXRatedExtension: (state, action: PayloadAction<boolean>) => {
      state.xRated = action.payload
    }
  },
})

export const {
  setXRatedExtension,
} = extensionsSlice.actions

export default extensionsSlice.reducer
