
import Image from "next/image"
import styled from "@emotion/styled"
import { CardInterface } from "../redux/reducers/cardPiles"

export const cardTypes: { [key: string]: string } = {
  "new-rules": "New rules",
  "punishment": "Punishment",
  "command": "Command",
  "inquisition": "Inquisition",
  "x-rated-command": "X-Rated command"
}

type CardContainerProps = {
  justifyContent: string
}

const CardContainer = styled.div<CardContainerProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.justifyContent};
  column-gap: 1rem;
  flex-direction: column;
  position: relative;

  @media (min-height: 350px) {
    justify-content: center;
  }
`

const CardData = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 1rem;
  flex-direction: row;
  position: absolute;
  top: 0;

  h2 {
    font-size: 2rem;
    color: var(--primary);
  }

  h3 {
    text-transform: uppercase;
  }
`

const CardTitleAndDetails = styled.div`
  text-align: left;

  && > h2 {
    text-align: left;
  }
`


const CardPoints = styled.div`
  align-self: flex-start;

  > h1 {
    margin: 0;
  }
`

const CardDescription = styled.p`
  position: fixed;
  top: 0;
  margin: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  text-align: center;
  font-size: 1.35em;
  z-index: 0;

  @media (max-width: 500px) {
    width: 90%;
  }
`

export const SpecialItemsContainer = styled.div`
  display: flex;
  column-gap: .25rem;
  margin-top: .5rem;
`

const Card = ({
  type,
  title,
  points,
  description,
  specialItems,
}: CardInterface) => {
  // const { width, height } = getWindowResize()
  // console.log("specialItems",specialItems)

  return (
    <CardContainer justifyContent={points === 0 ? "end" : "center"}>
      <CardData>
        <CardTitleAndDetails>
          <h2>{title}</h2>

          <h3>{cardTypes[type]}</h3>

          <SpecialItemsContainer>
            {specialItems && specialItems.map((item) => (
              <Image
                src={`/images/${item.type}.png`}
                alt={item.type}
                width="30"
                height="30"
                key={item.type}
              />
            ))}
          </SpecialItemsContainer>
        </CardTitleAndDetails>

        <CardPoints>
          {points !== null ? (
            <h1>{points === 0 ? "" : String(points)}</h1>
          ) : <h1>X</h1>}
        </CardPoints>
      </CardData>

      <CardDescription>{description}</CardDescription>
    </CardContainer>
  )
}

export default Card
