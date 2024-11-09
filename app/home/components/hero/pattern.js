'use client'

import { useEffect, useRef } from 'react'
import { StyledCanvas } from './styles'

const PatternGrid = ({ gap = 100, arrowSize = 40 }) => {
  const canvasRef = useRef(null)
  const arrowCanvasRef = useRef(null)
  const animationRef = useRef(null)
  const arrowsRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const arrowCanvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const arrowCtx = arrowCanvas.getContext('2d')

    // Set canvas dimensions
    const width = window.innerWidth
    const height = window.innerHeight
    canvas.width = width
    canvas.height = height

    // Prepare offscreen arrow canvas
    arrowCanvas.width = arrowSize
    arrowCanvas.height = arrowSize

    // Draw arrow shape once on the offscreen canvas
    const drawArrowShape = () => {
      arrowCtx.fillStyle = '#9B9B9B'
      arrowCtx.beginPath()
      arrowCtx.moveTo((57.8128 / 66) * arrowSize, (23.9971 / 43) * arrowSize)
      arrowCtx.lineTo((3.0015 / 66) * arrowSize, (0.0705 / 43) * arrowSize)
      arrowCtx.lineTo((1.5672 / 66) * arrowSize, (2.5845 / 43) * arrowSize)
      arrowCtx.bezierCurveTo(
        0,
        (8.662 / 43) * arrowSize,
        (2.8686 / 66) * arrowSize,
        (16.0216 / 43) * arrowSize,
        (9.8786 / 66) * arrowSize,
        (19.0191 / 43) * arrowSize,
      )
      arrowCtx.lineTo((64.6899 / 66) * arrowSize, (42.9457 / 43) * arrowSize)
      arrowCtx.lineTo((66.1242 / 66) * arrowSize, (40.4316 / 43) * arrowSize)
      arrowCtx.bezierCurveTo(
        (69.5898 / 66) * arrowSize,
        (34.3542 / 43) * arrowSize,
        (66.7212 / 66) * arrowSize,
        (26.9946 / 43) * arrowSize,
        (59.7112 / 66) * arrowSize,
        (24.9971 / 43) * arrowSize,
      )
      arrowCtx.closePath()
      arrowCtx.fill()
    }

    drawArrowShape()

    arrowCanvasRef.current = arrowCanvas

    // Initialize arrow positions and rotations
    const arrows = []
    const columns = Math.floor(width / gap) + 1
    const rows = Math.floor(height / gap) + 1

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        const posX = x * gap
        const posY = y * gap
        arrows.push({
          x: posX,
          y: posY,
          rotation: 0,
          targetRotation: 0,
        })
      }
    }

    arrowsRef.current = arrows

    // Normalize angle to ensure smooth rotation transition
    const normalizeAngle = (angle) => {
      while (angle < -180) angle += 360
      while (angle > 180) angle -= 360
      return angle
    }

    // Function to render all arrows
    const render = () => {
      ctx.clearRect(0, 0, width, height)
      arrows.forEach((arrow) => {
        // Interpolate rotation for smooth animation
        const angleDiff = normalizeAngle(arrow.targetRotation - arrow.rotation)
        arrow.rotation += angleDiff * 0.1

        ctx.save()
        ctx.translate(arrow.x, arrow.y)
        ctx.rotate((arrow.rotation * Math.PI) / 180)
        ctx.drawImage(
          arrowCanvasRef.current,
          -arrowSize / 2,
          -arrowSize / 2,
          arrowSize,
          arrowSize,
        )
        ctx.restore()
      })
      animationRef.current = requestAnimationFrame(render)
    }

    render()

    // Throttle function to limit mousemove event calls
    const throttle = (func, limit) => {
      let inThrottle
      return function (...args) {
        if (!inThrottle) {
          func.apply(this, args)
          inThrottle = true
          setTimeout(() => (inThrottle = false), limit)
        }
      }
    }

    // Mouse move handler
    const handleMouseMove = throttle((event) => {
      const mouseX = event.clientX
      const mouseY = event.clientY

      arrows.forEach((arrow) => {
        const dx = mouseX - arrow.x
        const dy = mouseY - arrow.y
        const angle = Math.atan2(dy, dx)
        const degrees = (angle * 180) / Math.PI
        arrow.targetRotation = degrees
      })
    }, 50) // Adjust throttle limit (milliseconds) as needed

    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [gap, arrowSize])

  return <StyledCanvas ref={canvasRef} />
}

export default PatternGrid
