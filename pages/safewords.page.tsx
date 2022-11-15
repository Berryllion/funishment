import styled from "@emotion/styled"
import { useRouter } from "next/router"

import rules from "../json/rules.json"

import Main from "../design-system/Main"
import { Button, ButtonsContainer } from "../design-system/Buttons"

import { emphasizeWords } from "../utils/text-manipulation"

const ContentWarningTitle = styled.h2`
  text-align: center;
`

export default function ContentWarning() {
  const router = useRouter()

  // const goToPlayersSetup = () => router.push("/players")
  const goToPlayersSetup = () => router.push("/extensions")

  const stoplightRules: { [key: string]: string } = rules.safety["content-warning"]["stoplight-safewords"]

  const stoplightColors = [ "red", "yellow", "green" ]

  return (
    <Main>
      <ContentWarningTitle>
        Stoplight Safewords
      </ContentWarningTitle>

      <p>{rules.safety["content-warning"]["stoplight-safewords"].description}</p>

      {stoplightColors.map(color => (
        <p key={color}>{emphasizeWords(stoplightRules[color], `var(--stoplight-${color})`)}</p>
      ))}

      <p>
        {emphasizeWords(stoplightRules["non-verbal"], stoplightColors.map(color => `var(--stoplight-${color})`))}
      </p>

      <p><b>{stoplightRules["respect"]}</b></p>

      <ButtonsContainer>
          <Button
            backgroundColor="var(--secondary)"
            hoverBackgroundColor="var(--secondary-shade)"
            onClick={goToPlayersSetup}
          >
            Continue
          </Button>

        </ButtonsContainer>
    </Main>
  )
}
