import playersReducer from "./players"
import extensionsReducer from "./extensions"
import cardPilesReducer from "./cardPiles"
import gameReducer from "./game"

const allReducers = {
  players: playersReducer,
  extensions: extensionsReducer,
  cardPiles: cardPilesReducer,
  game: gameReducer,
}

export default allReducers
