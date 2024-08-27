'use client'

import styled from 'styled-components'
import { Container, Z_INDEX } from 'styles'

export const SectionWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: ${Z_INDEX.hero};
`
export const HeroContainer = styled(Container)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-top: 2vw;
  padding-bottom: 2vw;
  z-index: 2;
`
export const TopLine = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vw;
  max-width: 25%;
`
export const MiddleLine = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
`
export const LinkWrapper = styled.div`
  display: flex;
  gap: 1vw;
`
export const ArrowGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;

  display: grid;
  grid-template-columns: repeat(${(props) => props.gridSize}, auto);
  justify-items: center;
  align-items: center;
  gap: 3vw;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => `rgb(${theme.body})`};

  opacity: 20%;
  filter: blur(1px);
`
