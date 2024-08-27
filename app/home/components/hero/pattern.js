'use client'

import { forwardRef, useEffect, useRef } from 'react'
import { ArrowGrid } from './styles'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Arrow = forwardRef(({ opacity, initialRotation }, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 66 43"
    ref={ref}
    style={{ transform: `rotate(${initialRotation}deg)` }}
  >
    <path
      fill="#9B9B9B"
      d="M57.8128 23.9971 3.0015.0705l-1.4343 2.514c-3.4656 6.0775-.597 13.4371 6.413 16.4346l54.8113 23.9266 1.4343-2.5141c3.4656-6.0774.5969-13.437-6.413-16.4345Z"
      opacity={opacity}
    />
  </svg>
))

const calculateOpacity = (index, gridSize) => {
  const { row, col } = getGridPosition(index, gridSize)

  // Top-left corner is at (0, 0)
  const topLeftX = 15
  const topLeftY = 15

  // Calculate the distance from the top-left corner
  const distanceFromTopLeft = Math.sqrt(
    Math.pow(row - topLeftY, 2) + Math.pow(col - topLeftX, 2),
  )

  // Calculate the maximum possible distance in the grid
  const maxDistance = Math.sqrt(
    Math.pow(gridSize - 1, 2) + Math.pow(gridSize - 1, 2),
  )

  // Normalize the distance to get opacity (1 at the top-left, 0 at the farthest point)
  const opacity = 1 - distanceFromTopLeft / maxDistance

  return opacity
}

const getGridPosition = (index, gridSize) => {
  const row = Math.floor(index / gridSize)
  const col = index % gridSize
  return { row, col }
}

const adjustRotation = (currentRotation, targetRotation) => {
  const delta = targetRotation - currentRotation
  const shortestDelta = ((delta + 180) % 360) - 180
  return currentRotation + shortestDelta
}

const calculateInitialRotation = (index, gridSize) => {
  const { row, col } = getGridPosition(index, gridSize)
  const centerX = (gridSize - 1) / 2
  const centerY = (gridSize - 1) / 2
  const angleToCenter =
    Math.atan2(centerY - row, centerX - col) * (180 / Math.PI)
  return angleToCenter
}

const PatternGrid = () => {
  const gridSize = 20 // Define the grid size (e.g., 20x20)
  const items = Array.from({ length: gridSize * gridSize })
  const itemRefs = useRef([])

  useEffect(() => {
    const centerX = (gridSize - 1) / 2
    const centerY = (gridSize - 1) / 2

    // Calculate stagger values based on distance from the center
    const staggerArray = itemRefs.current.map((itemRef, index) => {
      const { row, col } = getGridPosition(index, gridSize)
      const distanceFromCenter = Math.sqrt(
        Math.pow(row - centerY, 2) + Math.pow(col - centerX, 2),
      )
      return { itemRef, distanceFromCenter }
    })

    // Sort items by distance from center for staggered reveal
    staggerArray.sort((a, b) => a.distanceFromCenter - b.distanceFromCenter)

    // Extract the sorted elements
    const sortedElements = staggerArray.map(({ itemRef }) => itemRef)

    // Create the staggered reveal animation from the center
    gsap.fromTo(
      sortedElements,
      { scale: 0 },
      {
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: {
          each: 0.05, // Time between each stagger
          grid: [gridSize, gridSize],
          from: [0, 1],
        },
      },
    )

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event
      itemRefs.current.forEach((itemRef, index) => {
        if (itemRef) {
          const { top, left, width, height } = itemRef.getBoundingClientRect()
          const itemCenterX = left + width / 2
          const itemCenterY = top + height / 2
          const angle =
            Math.atan2(clientY - itemCenterY, clientX - itemCenterX) *
            (180 / Math.PI)

          // Safely handle rotation to avoid flipping
          const currentRotation = gsap.getProperty(itemRef, 'rotation') || 0
          gsap.to(itemRef, {
            rotation: adjustRotation(currentRotation, angle),
            transformOrigin: '50% 50%',
            duration: 1,
            ease: 'power3.out',
          })
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <ArrowGrid gridSize={gridSize}>
      {items.map((_, index) => {
        const initialRotation = calculateInitialRotation(index, gridSize)

        return (
          <Arrow
            opacity={calculateOpacity(index, gridSize)}
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            initialRotation={initialRotation}
          />
        )
      })}
    </ArrowGrid>
  )
}

export default PatternGrid
