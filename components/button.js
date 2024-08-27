'use client'

import styled from 'styled-components'

const ButtonWrapper = styled.a`
  display: block;
  position: relative;
  padding: 12px 24px;
  background-color: ${({ theme }) => `rgb(${theme.brand})`};
  color: ${({ theme }) => `rgb(${theme.reverseText})`};
  border-radius: 10px;
  text-decoration: none;
  height: fit-content;
  width: fit-content;
  will-change: transform;
  cursor: pointer;
`

const CustomButton = ({ children, onClick }) => {
  return <ButtonWrapper onClick={onClick}>{children}</ButtonWrapper>
}

export default CustomButton
