// import { useState } from "react"
// import styled from "@emotion/styled"
import { useRouter } from "next/router"

// import cards from "../json/cards.json"

import Main from "../design-system/Main"
// import { Button, ButtonsContainer, RoleButton, RoleButtonsContainer } from "../design-system/Buttons"
// import { emphasizeWords } from "../utils/text-manipulation"

// const xRatedExtensions = false

// let homeItems: Array<string> = []
// let sexToysItems: Array<string> = []

// // TODO: remove x-rated cards before parsing items
// cards.map(card => {
//   // if (!xRatedExtensions && card.type === "x-rated-command") return

//   const cardSpecialItems = card["specialItems"] ?? null

//   if (cardSpecialItems) {
//     cardSpecialItems.map((items: { type: string, items: Array<string> }) => {
//       if (items.type === "home") homeItems.push(...items.items)
//       if (items.type === "sex-toys") sexToysItems.push(items.items)
//     })
//   }
// })

// const noDuplicatesHomeItems = new Set([...homeItems])
// const noDuplicatesSexToysItems = new Set([...sexToysItems])

export default function ContentWarning() {
  const router = useRouter()

  const goToSafewords = () => router.push("/safewords")

  return (
    <Main>
      {/* <h2>Items</h2>

      <h3>Home</h3>
      <ul>
        {Array.from(noDuplicatesHomeItems).map(e => (
          <li key={e}>{e}</li>
        ))}
      </ul>

      <p></p>
      <ButtonsContainer>
        <Button
          backgroundColor="var(--secondary)"
          hoverBackgroundColor="var(--secondary-shade)"
          onClick={goToSafewords}
        >
          Continue
        </Button>
      </ButtonsContainer> */}
    </Main>
  )
}
