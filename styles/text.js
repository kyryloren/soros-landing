'use client'

import styled, { css } from 'styled-components'
import media, { pxCutOff } from './media'

export const Normal = css`
  // 16

  font-size: 1vw;
  font-weight: 400;
  line-height: 1.3;

  ${media.desktopL`font-size: 16px;`}
`
export const NormalText = styled.p`
  ${Normal}
  margin: ${({ $nm, $m }) => ($nm ? 0 : $m ? $m : 'unset')};
`
export const Medium = css`
  // 24 > 16
  font-size: ${pxCutOff(24)};
  font-weight: 400;
  line-height: 1.2;

  ${media.desktop`font-size: clamp(1rem, 0.8239rem + 0.7512vw, 1.5rem);`}
`
export const MediumText = styled.p`
  ${Medium}
  margin: ${({ $nm, $m }) => ($nm ? 0 : $m ? $m : 'unset')};
`
export const Large = css`
  // 40 > 32
  font-size: ${pxCutOff(40)};
  font-weight: 400;
  line-height: 1;

  ${media.desktop`font-size: clamp(2rem, 1.8239rem + 0.7512vw, 2.5rem);`}
`
export const LargeText = styled.p`
  ${Large}
  margin: ${({ $nm, $m }) => ($nm ? 0 : $m ? $m : 'unset')};
`
export const Huge = css`
  // 56 > 40
  font-size: ${pxCutOff(56)};
  font-weight: 400;
  line-height: 1;

  ${media.desktop`font-size: clamp(2.5rem, 2.1479rem + 1.5023vw, 3.5rem);`}
`
export const HugeText = styled.p`
  ${Huge}
  margin: ${({ $nm, $m }) => ($nm ? 0 : $m ? $m : 'unset')};
`
export const Display = css`
  // 72 > 56

  font-size: ${pxCutOff(72)};
  font-weight: 400;
  line-height: 1;

  ${media.desktopL`font-size: clamp(3.5rem, 3.1479rem + 1.5023vw, 4.5rem);`}
`
export const DisplayText = styled.h1`
  ${Display}
  margin: ${({ $nm, $m }) => ($nm ? 0 : $m ? $m : 'unset')};
`
