
import styled from "@emotion/styled"
import type { AppProps } from "next/app"
import { Provider } from 'react-redux'

import { store } from "../redux/store"

// import { getWindowResize } from "../utils/hooks"

import "../public/styles/fonts.css"
import "../public/styles/globals.css"

const RotateScreenOverlay = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function App({ Component, pageProps }: AppProps) {
  // const { width, height } = getWindowResize();

  // if (width && height && width < height) {
  //   return (
  //     <RotateScreenOverlay>
  //       Please rotate your screen to play
  //     </RotateScreenOverlay>
  //   )
  // }

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
