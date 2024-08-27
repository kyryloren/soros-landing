'use client'

import styled from 'styled-components'
import { Z_INDEX } from 'styles'

export const SectionWrapper = styled.section`
  position: relative;
  margin: 10vw 0;
  z-index: ${Z_INDEX.three};
`
export const TextWrapper = styled.div`
  position: relative;
  max-width: 20%;
`
export const GalleryWrapper = styled.div`
  position: relative;
  display: block;
  transform-origin: center bottom;
`
export const ScaleWrapper = styled.div`
  transform-origin: center bottom;
  will-change: transform;
`
export const RowsWrapper = styled.div`
  overflow: hidden;
`
export const GridWrapper = styled.div`
  white-space: nowrap;
  position: relative;
`
export const ImageWrapper = styled.div`
  width: 35vw;
  height: 45vh;
  margin-right: 20px;
  display: inline-block;
  margin-top: 2vw;

  img {
    position: relative !important;
    object-fit: cover;
    border-radius: 10px;
  }
`
