import { useState } from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"

import Main from "../design-system/Main"
import styled from "@emotion/styled"

import { Input } from "../design-system/Inputs"
import { Button, ButtonsContainer, RoleButton, RoleButtonsContainer } from "../design-system/Buttons"
import Error from "../design-system/Error"

import { setPlayer1, setPlayer2 } from "../redux/reducers/players"

const PlayersForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 1rem;
`

const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;

  label {
    min-width: 6rem;
    font-weight: 700;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: start;
    row-gap: 1rem;

    input {
      width: 100%;
    }
  }
`

const roles: { [key: string]: string } = {
  "dom": "Dominant",
  "sub": "Submissive",
  "switch": "Switch",
}

export default function Players() {
  const router = useRouter()
  const dispatch = useDispatch()

  const [firstPlayerName, setFirstPlayerName] = useState("")
  const [secondPlayerName, setSecondPlayerName] = useState("")

  const [firstPlayerRole, setFirstPlayerRole] = useState("")
  const [secondPlayerRole, setSecondPlayerRole] = useState("")

  const [error, setError] = useState("")

  const setRolesFirstPlayer = (role: string) => {
    setFirstPlayerRole(role)

    if (role === "switch") {
      setSecondPlayerRole("switch")
    } else {
      if (secondPlayerRole === "switch") setSecondPlayerRole("")
    }
  }

  const setRolesSecondPlayer = (role: string) => {
    setSecondPlayerRole(role)

    if (role === "switch") {
      setFirstPlayerRole("switch")
    } else {
      if (firstPlayerRole === "switch") setFirstPlayerRole("")
    }
  }

  const checkErrorsForm = () => {
    let hasErrors = false

    // Check names
    if (firstPlayerName === "") {
      hasErrors = true
      setError("Error: Player 1 has no name!")
    }
    if (secondPlayerName === "") {
      hasErrors = true
      setError("Error: Player 2 has no name!")
    }
    if (firstPlayerName === "" && secondPlayerName === "") {
      hasErrors = true
      setError("Error: Both players have no name!")
    }

    // Check roles
    if (firstPlayerRole === "") {
      hasErrors = true
      setError("Error: Player 1 has no role!")
    }
    if (secondPlayerRole === "") {
      hasErrors = true
      setError("Error: Player 2 has no role!")
    }
    if (firstPlayerRole === "" && secondPlayerRole === "") {
      hasErrors = true
      setError("Error: Both players have no role!")
    }

    return hasErrors
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!checkErrorsForm()) {
      setError("")

      dispatch(
        setPlayer1({
          name: firstPlayerName,
          role: firstPlayerRole,
        })
      )
      dispatch(
        setPlayer2({
          name: secondPlayerName,
          role: secondPlayerRole,
        })
      )

      router.push("/extensions")
    }
  }

  return (
    <Main>
      <PlayersForm onSubmit={onSubmit}>
        <PlayerContainer>
          <h2>Player 1</h2>

          <Input
            value={firstPlayerName}
            onChange={(e) => setFirstPlayerName(e.target.value)}
          />

          <RoleButtonsContainer>
            {Object.keys(roles).map((role) => (
              <RoleButton
                type="button"
                onClick={() => setRolesFirstPlayer(role)}
                selected={role === firstPlayerRole}
                role={role}
              >
                {roles[role]}
              </RoleButton>
            ))}
          </RoleButtonsContainer>
        </PlayerContainer>

        <PlayerContainer>
          <h2>Player 2</h2>

          <Input
            value={secondPlayerName}
            onChange={(e) => setSecondPlayerName(e.target.value)}
          />

          <RoleButtonsContainer>
            {Object.keys(roles).map((role) => (
              <RoleButton
                type="button"
                onClick={() => setRolesSecondPlayer(role)}
                selected={role === secondPlayerRole}
                role={role}
              >
                {roles[role]}
              </RoleButton>
            ))}
          </RoleButtonsContainer>
        </PlayerContainer>
      </PlayersForm>

      <Error>{error}</Error>

      <ButtonsContainer>
        <Button
          backgroundColor="var(--secondary)"
          type="submit"
          onClick={onSubmit}
        >
          Continue
        </Button>
      </ButtonsContainer>
    </Main>
  )
}
