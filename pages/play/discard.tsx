import { useState } from "react"
import Image from "next/image"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"

import Main from "../../design-system/Main"
import {
  Button,
  GoBackButton,
  QuickReadButtonContainer,
} from "../../design-system/Buttons"
import Card, { cardTypes, SpecialItemsContainer } from "../../design-system/Card"

import { RootState } from "../../redux/store"
import {
  CardInterface,
  discardToPlay,
  queueDiscardToPlay,
} from "../../redux/reducers/cardPiles"

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 3%;
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 2;
  background-color: var(--background);

  > * {
    text-align: center;
  }
`

const CardsContainer = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 1.5rem;
  background-color: #ffffff05;
  padding: 1.5rem;
  border-radius: 35px;

  && > h2 {
    text-align: left;
  }
`

const Space = styled.div<{
  height: string
}>`
  height: ${(props) => props.height};
`

const TitleAndItems = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

interface QuickReadCardInterface extends CardInterface {
  onClick: any,
  selectedCards: Array<number>,
}

const QuickReadCard = ({
  type,
  title,
  points,
  description,
  specialItems,
  index,
  onClick,
  selectedCards,
}: QuickReadCardInterface) => {
  const { pilesViewOnly } = useSelector(( state: RootState ) => state.game)

  return (
    <CardsContainer key={index}>
      <TitleAndItems>
        <h2>{title}</h2>

        <SpecialItemsContainer>
          {specialItems && specialItems.map((item) => (
            <Image
              src={`/images/${item.type}.png`}
              alt={item.type}
              width="20"
              height="20"
              key={item.type}
            />
          ))}
        </SpecialItemsContainer>
      </TitleAndItems>

      <h3>{cardTypes[type]}</h3>

      <Space height="1rem" />

      {description}

      {!pilesViewOnly && (
        <QuickReadButtonContainer>
          {!selectedCards.includes(index || 0) && (
            <Button
              small
              backgroundColor="var(--stoplight-yellow)"
              hoverBackgroundColor="var(--stoplight-yellow-shade)"
              onClick={() => onClick(index)}
            >
              Play card!
            </Button>
          )}
        </QuickReadButtonContainer>
      )}
    </CardsContainer>
  )
}

export default function Discard() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { currentCard, discardPile } = useSelector(( state: RootState ) => state.cardPiles)

  if (!currentCard) return null

  const [cardsToPlay, setCardsToPlay] = useState<Array<number>>([])

  const nbCardToPlay = currentCard.title === "TREASURE CHEST" ? 2 : 1

  const onClick = (index: number) => {
    if (currentCard.title === "TREASURE CHEST") {
      if (cardsToPlay.length + 1 !== nbCardToPlay && cardsToPlay.length + 1 !== discardPile.length) {
        setCardsToPlay([ ...cardsToPlay, index ])
      } else {
        dispatch(queueDiscardToPlay([ ...cardsToPlay, index ]))
        router.push("/play")
        return
      }
    }

    if (currentCard.title === "WISH FULFILLMENT" || currentCard.title === "YOU THIRSTY!") {
      dispatch(discardToPlay(index ?? 0))
      router.push("/play")
    }
  }

  return (
    <Main>
      <Header>
        <GoBackButton />

        <h2>Discard Pile</h2>
      </Header>

      <Space height="2rem" />

      {discardPile.length !== 0 ? discardPile.map((card, index) => (
        <QuickReadCard
          type={card.type}
          title={card.title}
          points={card.points}
          description={card.description}
          specialItems={card.specialItems}
          index={index}
          onClick={onClick}
          selectedCards={cardsToPlay}
          key={index}
        />
      )) : (
        <CardsContainer>No discarded cards!</CardsContainer>
      )}
    </Main>
  )
}
