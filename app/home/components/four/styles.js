'use client'

import styled from 'styled-components'
import { Z_INDEX } from 'styles'

export const SectionWrapper = styled.section`
  position: relative;
  margin-bottom: -100vh;
  width: 100vw;
  height: 100%;
  background-color: ${({ theme }) => `rgb(${theme.body})`};
  z-index: ${Z_INDEX.four};
  padding: 10vw 0;
  overflow: hidden;
`
export const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20vh;
`
export const ImageWrapper = styled.div`
  position: relative;
  width: 30vw;
`
export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8vw;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  span {
    color: ${({ theme }) => `rgb(${theme.secondary})`};
  }
`
