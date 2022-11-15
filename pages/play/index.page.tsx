import { useState, useEffect } from "react"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import _ from "lodash"
import { useSelector, useDispatch } from "react-redux"
import Image from "next/image"

import Main from "../../design-system/Main"
import { Button, ButtonsContainer } from "../../design-system/Buttons"
import Card from "../../design-system/Card"

import { AccessPiles } from "../../design-system/Modal"

import { RootState } from "../../redux/store"
import {
  stockToDiscard,
  stockToSoftLimits,
  stockToHardLimits,
  stockToNewRules,
  allNewRulesToStock,
  allDiscardToStock,
} from "../../redux/reducers/cardPiles"

const LimitsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: .5rem;
  flex-direction: row;
  position: absolute;
  bottom: -0;
  left: 0;
  padding: 5%;
  padding-bottom: var(--screen-padding);

  > button {
    padding: 1rem .5rem;
    width: 8rem;
  }
`

interface NoMarginButtonsContainerProps {
  column?: boolean
}

const NoMarginButtonsContainer = styled(ButtonsContainer)<NoMarginButtonsContainerProps>`
  margin: 0;
  row-gap: 1rem;
  z-index: 2;

  && {
    flex-direction: ${(props) => props.column ? "column" : "row"};
  }
`

interface PileMenuButtonProps {
  onClick: any
}

const PileMenuButtonContainer = styled.div<PileMenuButtonProps>`
  position: fixed;
  bottom: 3%;
  right: 3%;
  cursor: pointer;
  z-index: 3;
`

const PileMenuButton = ({ onClick }: PileMenuButtonProps) => {
  return (
    <PileMenuButtonContainer onClick={onClick}>
      <Image
        alt="Piles menu"
        src="/images/stack.png"
        width="30"
        height="30"
      />
    </PileMenuButtonContainer>
  )
}

export default function Play() {
  const router = useRouter()
  const dispatch = useDispatch()
  const {
    stockPile,
    currentCard,
    newRulesPile,
    softLimits,
    discardPile,
  } = useSelector(( state: RootState ) => state.cardPiles)

  const [showPilesMenu, setShowPilesMenu] = useState(false)

  if (currentCard === null) {
    console.log("ERROR: no current card.")
    return null
  }

  const playCard = () => {
    if (currentCard.type === "new-rules") {
      dispatch(stockToNewRules())
    } else {
      dispatch(stockToDiscard())
    }
  }

  const nextAction = () => {
    switch (currentCard.title) {
      case "FLASH FLOOD":
        dispatch(allNewRulesToStock())
        break

      case "SECOND CHANCES":
        dispatch(allDiscardToStock())
        break

      default:
        dispatch(stockToDiscard())
        break
    }
  }

  const OtherButtons = () => {
    if (currentCard.title === "CLEAN SWEEP") {
      return (
        <NoMarginButtonsContainer column={newRulesPile.length === 0}>
          <Button onClick={() => dispatch(stockToDiscard())}>Discard</Button>
          {newRulesPile.length !== 0 ? (
            <Button onClick={() => router.push("/play/new-rules")}>
              Remove a New Rules card
            </Button>
          ) : (
            <>There are currently no New Rules Cards in play.</>
          )}
        </NoMarginButtonsContainer>
      )
    }

    if (currentCard.title === "CHECK-IN CHARLIE") {
      return (
        <NoMarginButtonsContainer column={softLimits.length === 0}>
          {softLimits.length !== 0 ? (
            <>
              <Button onClick={nextAction}>Discard</Button>
              <Button onClick={() => router.push("/play/soft-limits")}>
                Check Soft Limits pile
              </Button>
            </>
          ) : <>
            <Button onClick={nextAction}>Discard</Button>
            There are currently no cards in the Soft Limits pile.
          </>}
        </NoMarginButtonsContainer>
      )
    }

    if (currentCard.title === "WISH FULFILLMENT" || currentCard.title === "YOU THIRSTY!" || currentCard.title === "TREASURE CHEST") {
      return (
        <NoMarginButtonsContainer column={discardPile.length === 0}>
          {discardPile.length !== 0 ? (
            <>
              {currentCard.title !== "TREASURE CHEST" && (
                <Button onClick={nextAction}>Discard</Button>
              )}
              <Button onClick={() => router.push("/play/discard")}>
                Check Discard pile
              </Button>

            </>
          ) : <>
            <Button onClick={nextAction}>Discard</Button>
            There are currently no cards in the Discard pile.
          </>}
        </NoMarginButtonsContainer>
      )
    }

    if (currentCard.title === "AS THE PROPHECY FORETOLD") {
      return (
        <NoMarginButtonsContainer>
          {stockPile.length !== 0 ? (
            <Button onClick={() => router.push("/play/stock")}>
              Check Stock pile
            </Button>
          ) : <>
            <Button onClick={nextAction}>Discard</Button>
            There are currently no cards left to play!
          </>}
        </NoMarginButtonsContainer>
      )
    }

    return (
      <NoMarginButtonsContainer>
        <Button onClick={nextAction}>Next</Button>
      </NoMarginButtonsContainer>
    )
  }

  return (
    <Main>
      <Card
        type={currentCard.type}
        title={currentCard.title}
        points={currentCard.points}
        description={currentCard.description}
        specialItems={currentCard.specialItems}
      />

      {currentCard.points !== 0 ? (
        <LimitsContainer>
          <Button
            backgroundColor="var(--stoplight-red)"
            hoverBackgroundColor="var(--stoplight-red-shade)"
            onClick={() => dispatch(stockToHardLimits())}
          >
            NO.
          </Button>

          <Button
            backgroundColor="var(--stoplight-yellow)"
            hoverBackgroundColor="var(--stoplight-yellow-shade)"
            onClick={() => dispatch(stockToSoftLimits())}
          >
            MAYBE?
          </Button>

          <Button
            backgroundColor="var(--stoplight-green)"
            hoverBackgroundColor="var(--stoplight-green-shade)"
            onClick={playCard}
          >
            YES!
          </Button>
        </LimitsContainer>
      ) : (
        OtherButtons()
      )}

      <PileMenuButton onClick={() => setShowPilesMenu(!showPilesMenu)} />
      {
        showPilesMenu && <AccessPiles onClose={() => setShowPilesMenu(false)} />
      }
    </Main>
  )
}
