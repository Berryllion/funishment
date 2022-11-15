import Image from "next/image"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"

import Main from "../../design-system/Main"
import {
  Button,
  GoBackButton,
} from "../../design-system/Buttons"
import { cardTypes, SpecialItemsContainer } from "../../design-system/Card"

import { RootState } from "../../redux/store"
import {
  CardInterface,
  softLimitsToHardLimits,
  softLimitsToStock,
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

const LimitsButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  column-gap: .5rem;
`

const QuickReadCard = ({
  type,
  title,
  points,
  description,
  specialItems,
  index,
}: CardInterface) => {
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
            />
          ))}
        </SpecialItemsContainer>
      </TitleAndItems>

      <h3>{cardTypes[type]}</h3>

      <Space height="1rem" />

      {description}

      {!pilesViewOnly && (
        <LimitsButtonsContainer>
          <Button
            small
            backgroundColor="var(--stoplight-red)"
            hoverBackgroundColor="var(--stoplight-red-shade)"
            onClick={() => {
              dispatch(softLimitsToHardLimits(index ?? 0))
            }}
          >
            NO.
          </Button>

          <Button
            small
            backgroundColor="var(--stoplight-yellow)"
            hoverBackgroundColor="var(--stoplight-yellow-shade)"
            onClick={() => dispatch(softLimitsToStock(index ?? 0))}
          >
            MAYBE?
          </Button>
        </LimitsButtonsContainer>
      )}
    </CardsContainer>
  )
}

export default function SoftLimits() {
  const router = useRouter()
  const { softLimits } = useSelector(( state: RootState ) => state.cardPiles)

  return (
    <Main>
      <Header>
        <GoBackButton />

        <h2>Soft Limits</h2>
      </Header>

      <Space height="2rem" />

      {softLimits.length !== 0 ? softLimits.map((card, index) => (
        <QuickReadCard
          type={card.type}
          title={card.title}
          points={card.points}
          description={card.description}
          specialItems={card.specialItems}
          index={index}
        />
      )) : <CardsContainer>No Soft Limits cards!</CardsContainer>}
    </Main>
  )
}
