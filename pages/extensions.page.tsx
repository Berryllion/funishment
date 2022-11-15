import { useState } from "react"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"

import Main from "../design-system/Main"
import {
  Button,
  ButtonsContainer,
  RoleButton,
  RoleButtonsContainer
} from "../design-system/Buttons"

import { emphasizeWords } from "../utils/text-manipulation"
import { shuffleArray } from "../utils/array-manipulation"

import { RootState } from "../redux/store"
import { setXRatedExtension } from "../redux/reducers/extensions"
import { fillStockPile, setCurrentCard } from "../redux/reducers/cardPiles"

import cards from "../json/cards.json"

export default function ContentWarning() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { xRated } = useSelector(( state: RootState ) => state.extensions)

  // const goToItems = () => router.push("/items")
  const goToItems = () => {
    let stockPile = null

    if (xRated) {
      stockPile = cards
    } else {
      stockPile = cards.filter(card => card.type !== "x-rated-command")
    }

    stockPile = shuffleArray(stockPile)
    // stockPile = stockPile.map((card, i) => ({
    //   ...card,
    //   index: i,
    // }))

    dispatch(fillStockPile(stockPile))
    dispatch(setCurrentCard(stockPile[0]))

    router.push("/play")
  }

  return (
    <Main>
      <h2>Extensions</h2>

      <p>
        {emphasizeWords("Add **X-Rated** extension?", "var(--primary)")}
      </p>
      <RoleButtonsContainer>
        <RoleButton
          selected={xRated}
          onClick={() => dispatch(setXRatedExtension(true))}
        >
          Yes
        </RoleButton>
        <RoleButton
          selected={!xRated}
          onClick={() => dispatch(setXRatedExtension(false))}
        >
          No
        </RoleButton>
      </RoleButtonsContainer>

      <p></p>
      <ButtonsContainer>
        <Button
          backgroundColor="var(--secondary)"
          onClick={goToItems}
        >
          Continue
        </Button>
      </ButtonsContainer>
    </Main>
  )
}
