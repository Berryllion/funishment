import { useRef } from 'react'
import styled from "@emotion/styled"
import { useRouter } from "next/router"

import { useClickOutside } from '../utils/hooks'
import { Button } from './Buttons';
import { useDispatch } from 'react-redux';
import { setPilesViewOnly } from '../redux/reducers/game';

export const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 5;
`;

const CloseButtonContainer = styled.div`
  position: fixed;
  right: 3%;
  top: 0;
`;

const Content = styled.div`
  position: relative;
  overflow: auto;
`;

type ModalProps = {
  children?: JSX.Element[] | JSX.Element | string,
  onClose: () => void,
};

const Modal = ({
  children,
  onClose,
}: ModalProps) => {
  const modalContentRef = useRef(null);


  useClickOutside(modalContentRef, onClose);

  return (
    <Overlay>
      <Content
        ref={modalContentRef}
      >
        <CloseButtonContainer onClick={onClose}>
          <h1>X</h1>
        </CloseButtonContainer>
        {children}
      </Content>
    </Overlay>
  );
}

export default Modal

interface AccessPilesProps {
  onClose: any
}

const AccessPilesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: .5rem;
`

export const AccessPiles = ({ onClose }: AccessPilesProps) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const piles = [
    {
      title: "Discard pile",
      key: "discard",
      backgroundColor: "var(--primary)",
      hoverBackgroundColor: "var(--primary-shade)",
    },
    {
      title: "Soft Limits pile",
      key: "soft-limits",
      backgroundColor: "var(--stoplight-yellow)",
      hoverBackgroundColor: "var(--stoplight-yellow-shade)",
    },
    // {
    //   title: "Hard Limits pile",
    //   key: "hard-limits",
    //   backgroundColor: "var(--stoplight-red)",
    //   hoverBackgroundColor: "var(--stoplight-red-shade)",
    // },
    {
      title: "New Rules pile",
      key: "new-rules",
      backgroundColor: "var(--tertiary)",
      hoverBackgroundColor: "var(--tertiary-shade)",
    },
  ]

  const onClick = (key: string) => {
    dispatch(setPilesViewOnly(true))
    router.push(`/play/${key}`)
  }

  return (
    <Modal onClose={onClose}>
      <AccessPilesContainer>
        {piles.map(pile => (
          <Button
            backgroundColor={pile.backgroundColor}
            hoverBackgroundColor={pile.hoverBackgroundColor}
            onClick={() => onClick(pile.key)}
            key={pile.key}
          >
            {pile.title}
          </Button>
        ))}
      </AccessPilesContainer>
    </Modal>
  )
}
