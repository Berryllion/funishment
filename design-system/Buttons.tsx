import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"

import { setPilesViewOnly } from "../redux/reducers/game"
import { RootState } from "../redux/store"

type ButtonProps = {
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  textColor?: string;
  transparent?: Boolean;
  small?: Boolean;
};

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  /* text-transform: uppercase; */
  font-weight: bold;
  font-size: 1.2rem;
  width: fit-content;
  padding: ${(props) => props.small ? ".5rem 1.5rem" : "1rem 3rem"};
  border-radius: 35px;
  background-color: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : "var(--primary)"
  };
  color: var(--white);

  :hover {
    background-color: ${(props) =>
    props.hoverBackgroundColor
      ? props.hoverBackgroundColor
      : "var(--primary-shade)"
  };
  }

  :disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  @media (max-width: 800px) {
    font-size: 1rem;
  }
`;

export const ButtonsContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;

  @media (max-width: 1000px) {
    flex-direction: column;
    row-gap: 1rem;
  }
`

export const RoleButtonsContainer = styled.div`
  display: flex;
  align-items: space-between;
  width: 100%;
  column-gap: 1rem;
`

type RoleButtonProps = {
  selected?: boolean;
  role?: string;
};

export const RoleButton = styled.button<RoleButtonProps>`
  cursor: pointer;
  width: min-content;
  flex: 1;
  background-color: var(--primary);
  padding: .75rem 0;
  border-radius: 35px;
  font-weight: 700;
  font-size: .85em;
  opacity: ${(props) => props.selected ? "1" : ".3"};
  ${(props) => props.role === "switch" && "background-color: var(--tertiary);"}

  @media (min-width: 799px) {
    padding: 1.25rem .5rem;
  }
`

export const GoBackButton = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { pilesViewOnly } = useSelector(( state: RootState ) => state.game)

  const onClick = () => {
    if (pilesViewOnly) {
      dispatch(setPilesViewOnly(false))
    }

    router.push("/play")
  }

  return (
    <Button small onClick={onClick}>
      {`< Go back`}
    </Button>
  )
}

export const QuickReadButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  column-gap: .5rem;
`
