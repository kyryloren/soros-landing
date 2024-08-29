'use client'

import styled from 'styled-components'
import { Container, Huge, Z_INDEX } from 'styles'

export const SectionWrapper = styled.footer`
  position: relative;
  width: 100vw;
  height: 100vh;
  z-index: ${Z_INDEX.footer};
  padding-top: 3vw;
  margin-top: -100vh;
`
export const LittleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  gap: 1vw;
`
export const LogoWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10vw;

  svg {
    width: 100%;
    height: 100%;
  }
`
export const InnerLogoWrapper = styled.div`
  position: absolute;
  bottom: -88%;
  transform-origin: center center;
  width: 80vw;
`

export const LinksWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 1vw;
`
export const BottomContainer = styled(Container)`
  position: absolute;
  height: auto;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;
`

export const InputContainer = styled(Container)`
  position: relative;
  height: auto;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -20%);
`
export const CustomInput = styled.input`
  width: 100%;
  outline: none;
  background-color: transparent;
  padding: 1vw 0;
  color: ${({ theme }) => `rgb(${theme.text})`};
  border: none;
  border-bottom: 1px solid ${({ theme }) => `rgb(${theme.secondary})`};

  ${Huge}

  &::placeholder {
    opacity: 0.6;
    color: ${({ theme }) => `rgb(${theme.secondary})`};
  }
`
