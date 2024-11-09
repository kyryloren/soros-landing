'use client'

import styled from 'styled-components'
import { Z_INDEX } from 'styles'

export const SectionWrapper = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => `rgb(${theme.reverseBody})`};
  color: ${({ theme }) => `rgb(${theme.reverseText})`};
  z-index: ${Z_INDEX.one};
`
export const TextWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`
export const MovementWrapper = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  height: 100%;
`
export const SingleImageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 45vw;
  z-index: 2;

  img {
    position: relative;
    width: 100%;
    height: 100%;
  }
`
export const CardWrapper = styled.div`
  position: absolute;
  width: 20vw;
`
