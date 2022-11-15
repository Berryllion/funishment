import { useRouter } from "next/router"

import rules from "../json/rules.json"

import Main from "../design-system/Main"
import { Button, ButtonsContainer } from "../design-system/Buttons"

export default function ContentWarning() {
  const router = useRouter()

  const goToSafewords = () => router.push("/safewords")

  return (
    <Main>
      <h2>
        {rules.safety["content-warning"].title}
      </h2>

      {rules.safety["content-warning"].description.map(e => (
        <p key={e}>{e}</p>
      ))}

      <ButtonsContainer>
          <Button
            backgroundColor="var(--secondary)"
            hoverBackgroundColor="var(--secondary-shade)"
            onClick={goToSafewords}
          >
            Continue
          </Button>

        </ButtonsContainer>
    </Main>
  )
}
