// 'use client'

// import styled from 'styled-components'

// const ButtonWrapper = styled.a`
//   display: block;
//   position: relative;
//   padding: 12px 24px;
//   background-color: ${({ theme }) => `rgb(${theme.brand})`};
//   color: ${({ theme }) => `rgb(${theme.reverseText})`};
//   border-radius: 10px;
//   text-decoration: none;
//   height: fit-content;
//   width: fit-content;
//   will-change: transform;
//   cursor: pointer;
// `

// const CustomButton = ({ children, onClick }) => {
//   return <ButtonWrapper onClick={onClick}>{children}</ButtonWrapper>
// }

// export default CustomButton

'use client'
/**
 * @file CustomButton.js
 * @desc A custom button component with various styles and animations.
 */

import React, { useRef, useCallback } from 'react'
import gsap from 'gsap'
import styled from 'styled-components'
import { useIsTouchDevice } from 'hooks'
import { Normal } from 'styles'
import { useIsomorphicLayoutEffect } from 'react-use'

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
const StyledSpan = styled.span`
  position: absolute;
`
const StyledButton = styled.div`
  ${Normal}

  position: relative;
  display: inline-flex;
  flex-direction: column;
  overflow: hidden;
  will-change: transform;
  white-space: nowrap;

  &:disabled {
    background-color: ${({ theme }) => `rgb(${theme.text})`};
  }
`

const CustomButton = (props) => {
  const { to, target, children, onClick, className } = props
  const isTouchDevice = useIsTouchDevice()
  const movingContainerRef = useRef(null)

  let line1 = useRef(null)
  let line2 = useRef(null)
  const tl = useRef()

  useIsomorphicLayoutEffect(() => {
    tl.current = gsap
      .timeline()
      .set(line2, { yPercent: -100 })
      .to(line1, { yPercent: 100, duration: 0.5, ease: 'power3.inOut' }, 0)
      .to(line2, { yPercent: 0, duration: 0.5, ease: 'power3.inOut' }, 0)
  }, [])

  const handleMouseMove = useCallback(
    (e) => {
      if (isTouchDevice) return

      const bounds = movingContainerRef.current.getBoundingClientRect()

      // Calculate the distance from the cursor to the center of the element
      const centerX = bounds.left + bounds.width / 2
      const distanceX = e.clientX - centerX

      // Determine the magnet effect threshold (e.g., 100 pixels)
      const magnetThreshold = 100

      let xPosition
      if (Math.abs(distanceX) < magnetThreshold) {
        // Apply a magnet effect: the closer to the center, the stronger the pull
        xPosition = distanceX
      } else {
        // If the cursor is outside the magnet threshold, don't apply the magnet effect
        xPosition = bounds.clientWidth
      }

      // Apply the animation with GSAP
      gsap.to(movingContainerRef.current, {
        x: xPosition,
        y:
          (e.clientY - bounds.top - movingContainerRef.current.clientHeight) /
          2,
        scale: 1.1,
        duration: 1,
        ease: 'expo.out',
      })
    },
    [isTouchDevice],
  )

  const handleMouseEnter = useCallback(() => {
    tl.current.reverse()
  })

  const handleMouseExit = useCallback(() => {
    tl.current.play()

    gsap.to(movingContainerRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'expo.out',
    })
  }, [])

  return (
    <ButtonWrapper
      href={to}
      ref={movingContainerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseExit}
      onClick={onClick}
      className={className}
      target={target === '_blank' ? '_blank' : undefined}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      role="button"
    >
      <StyledButton>
        <div ref={(el) => (line1 = el)}>{children}</div>
        <StyledSpan ref={(el) => (line2 = el)}>{children}</StyledSpan>
      </StyledButton>
    </ButtonWrapper>
  )
}

export default CustomButton
