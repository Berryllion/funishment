export function clearStorage() {
  sessionStorage.removeItem("players")
  sessionStorage.removeItem("decks")
  sessionStorage.removeItem("cards")
  sessionStorage.removeItem("level")
  sessionStorage.removeItem("currentCard")
  sessionStorage.removeItem("currentPlayer")
}

export function getStorage() {
  const players = sessionStorage.getItem("players")
  const decks = sessionStorage.getItem("decks")
  const cards = sessionStorage.getItem("cards")
  const level = sessionStorage.getItem("level")
  const currentCard = sessionStorage.getItem("currentCard")
  const currentPlayer = sessionStorage.getItem("currentPlayer")

  return {
    players,
    decks,
    cards,
    level,
    currentCard,
    currentPlayer,
  }
}
