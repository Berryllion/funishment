
import styled from "@emotion/styled"

type MainProps = {
  height?: string;
}

const Main = styled.div<MainProps>`
  margin: 0;
  padding: var(--screen-padding);
  display: flex;
  justify-content: center;
  flex-direction: column;
  transition: color 0.5s ease-out, background-color 0.5s ease-out;
  min-height: 100vh;

  @media(max-width: 800px) {
    /* padding: 8%; */
    margin: 0;
  }
`;

export default Main;
