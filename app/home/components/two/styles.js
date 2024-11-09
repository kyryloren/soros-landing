'use client'

import styled from 'styled-components'
import { Z_INDEX } from 'styles'

export const SectionWrapper = styled.section`
  position: relative;
  margin-bottom: -100vh;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => `rgb(${theme.body})`};
  overflow: hidden;
  z-index: ${Z_INDEX.two};
`
export const ContentContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`
export const TextWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 2vw;
  max-width: 22%;
`
export const SVGWrapper = styled.div`
  position: relative;
  margin-left: auto;
  z-index: 1;

  svg {
    width: 60vw;
    height: 100%;
  }
`
export const SecurityWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
`
export const MarqueeWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
  z-index: 5;

  h1 {
    line-height: 1.1;
  }
`
export const SecurityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.gridSize}, auto);
  gap: 2vw;
  justify-items: center;
  align-items: center;
  width: 100vw;
  height: 100vw;
  background-color: transparent;

  svg {
    width: 100%;
    height: 100%;
    rotate: 4deg;
    opacity: 1;
  }
`
