'use client'

import { styled } from 'styled-components'
import media from './media'

const Container = styled.div`
  width: 100%;
  height: ${({ _height }) => (_height ? _height : 'inherit')};
  padding-right: 3vw;
  padding-left: 3vw;
  margin-right: auto;
  margin-left: auto;

  ${media.tabletS`
    padding-right: 1rem;
    padding-left: 1rem;
  `};
`

export default Container
