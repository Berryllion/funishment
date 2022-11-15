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
import { cardTypes, SpecialItemsContainer } from "../../design-system/Card"

import { RootState } from "../../redux/store"
import { CardInterface, newRulesToDiscard } from "../../redux/reducers/cardPiles"

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 3%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const QuickReadCard = ({
  type,
  title,
  points,
  description,
  specialItems,
  index,
}: CardInterface) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { pilesViewOnly } = useSelector(( state: RootState ) => state.game)

  return (
    <CardsContainer>
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
          <Button
            small
            onClick={() => {
              dispatch(newRulesToDiscard(index ?? 0))
              router.push("/play")
            }}
          >
            Discard
          </Button>
        </QuickReadButtonContainer>
      )}
    </CardsContainer>
  )
}

export default function NewRules() {
  const { newRulesPile } = useSelector(( state: RootState ) => state.cardPiles)

  return (
    <Main>
      <Header>
        <GoBackButton />

        <h2>New Rules</h2>
      </Header>

      <Space height="2rem" />

      {newRulesPile.length !== 0 ? newRulesPile.map((card, index) => (
        <QuickReadCard
          type={card.type}
          title={card.title}
          points={card.points}
          description={card.description}
          specialItems={card.specialItems}
          index={index}
          key={index}
        />
      )) : <CardsContainer>No New Rules cards!</CardsContainer>}
    </Main>
  )
}
