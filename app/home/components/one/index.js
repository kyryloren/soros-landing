'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { HugeText } from 'styles'
import {
  MovementWrapper,
  SectionWrapper,
  TextWrapper,
  CardWrapper,
} from './styles'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const frameCount = 42

const generateImagePaths = () =>
  Array.from(
    { length: frameCount },
    (_, index) =>
      `/video-1/frame-${(index + 1).toString().padStart(2, '0')}.webp`,
  )

const SectionOne = () => {
  const canvasRef = useRef(null)
  const sectionRef = useRef(null)
  const para1Ref = useRef(null)
  const para2Ref = useRef(null)
  const movementWrapperRef = useRef(null)
  const cardImages = useRef([])

  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
  const images = useRef(generateImagePaths())

  const updateFrameIndex = useCallback((index) => {
    setCurrentFrameIndex(index)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const imgElements = images.current.map((src) => {
      const img = new Image()
      img.src = src
      return img
    })

    // Calculate the max height-to-width ratio
    const maxHeightToWidthRatio = Math.max(
      ...imgElements.map((img) => img.height / img.width),
    )

    const drawImage = (index) => {
      const img = imgElements[index]
      const aspectRatio = img.width / img.height
      const imgWidth = canvas.width / window.devicePixelRatio
      const imgHeight = imgWidth / aspectRatio

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw the image centered vertically within the canvas
      ctx.drawImage(
        img,
        0,
        (canvas.height / window.devicePixelRatio - imgHeight) / 2,
        imgWidth,
        imgHeight,
      )
    }

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const canvasWidth = window.innerWidth * 0.45
      const canvasHeight = canvasWidth * maxHeightToWidthRatio

      // Set canvas width and height in device pixels for high-quality rendering
      canvas.width = canvasWidth * dpr
      canvas.height = canvasHeight * dpr
      canvas.style.width = `${canvasWidth}px`
      canvas.style.height = `${canvasHeight}px`

      // Ensure context scaling matches device pixel ratio for sharpness
      ctx.scale(dpr, dpr)

      drawImage(currentFrameIndex)
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas() // Initial canvas sizing

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [currentFrameIndex])

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=6500',
        scrub: true,
        pin: true,
        onUpdate: ({ progress }) => {
          if (progress >= 0.05) {
            const adjustedProgress = (progress - 0.05) * 2
            const frameIndex = Math.min(
              frameCount - 1,
              Math.floor(adjustedProgress * (frameCount - 1)),
            )
            updateFrameIndex(frameIndex)
          }
        },
      },
    })

    timeline
      .set(para2Ref.current, { display: 'none' }, 0)
      .set(cardImages.current, { top: '100%', right: '20%' }, 0)
      .fromTo(
        sectionRef.current,
        { clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)' },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
        0.0001,
      )
      .fromTo(
        para1Ref.current,
        { autoAlpha: 0.5, scale: 0.2 },
        { autoAlpha: 1, scale: 1 },
        0.0001,
      )
      .fromTo(movementWrapperRef.current, { top: '100%' }, { top: '0%' }, 0.5) // Animating MovementWrapper
      .set(para1Ref.current, { display: 'none' }, 1)
      .set(para2Ref.current, { display: 'block' }, 1)
      .to(movementWrapperRef.current, { top: '-80%' }, 1.3) // Animating MovementWrapper
      .to(para2Ref.current, { xPercent: -80 }, 1.6)
      .to(
        cardImages.current[0],
        { top: '25%', right: '22%', transform: 'translateY(-25%)' },
        1.6,
      )
      .to(
        cardImages.current[1],
        { top: '45%', right: '12%', transform: 'translateY(-45%)' },
        1.8,
      )
      .to(
        cardImages.current[2],
        { top: '70%', right: '30%', transform: 'translateY(-70%)' },
        2,
      )
      .fromTo(
        sectionRef.current,
        { scale: 1, borderRadius: 0 },
        { scale: 0.95, borderRadius: 40 },
        2.5,
      )
      .fromTo(
        para2Ref.current,
        { filter: 'brightness(100%) contrast(100%)' },
        { filter: 'brightness(50%) contrast(135%)' },
        2.5,
      )
      .fromTo(
        cardImages.current,
        { filter: 'brightness(100%) contrast(100%)' },
        { filter: 'brightness(50%) contrast(135%)' },
        2.5,
      )
      .to('.section-two', { yPercent: -100 }, 2.5)
  }, [updateFrameIndex])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.src = images.current[currentFrameIndex]
    img.onload = () => {
      const aspectRatio = img.width / img.height
      const imgWidth = canvas.width / window.devicePixelRatio
      const imgHeight = imgWidth / aspectRatio

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.imageSmoothingEnabled = false

      // Draw the image centered vertically within the canvas
      ctx.drawImage(
        img,
        0,
        (canvas.height / window.devicePixelRatio - imgHeight) / 2,
        imgWidth,
        imgHeight,
      )
    }
  }, [currentFrameIndex])

  return (
    <SectionWrapper ref={sectionRef}>
      <MovementWrapper ref={movementWrapperRef}>
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '45vw',
            zIndex: 2,
          }}
        />
      </MovementWrapper>
      <TextWrapper>
        <HugeText ref={para1Ref}>
          Works just like
          <br />
          your favorite stores.
        </HugeText>
        <div ref={para2Ref}>
          <HugeText>With all the</HugeText>
          <HugeText>brands you love.</HugeText>
        </div>
      </TextWrapper>
      <CardWrapper ref={(el) => (cardImages.current[0] = el)}>
        <img src="/cards/card-one.svg" alt="Card One" />
      </CardWrapper>
      <CardWrapper ref={(el) => (cardImages.current[1] = el)}>
        <img src="/cards/card-two.svg" alt="Card Two" />
      </CardWrapper>
      <CardWrapper ref={(el) => (cardImages.current[2] = el)}>
        <img src="/cards/card-three.svg" alt="Card Three" />
      </CardWrapper>
    </SectionWrapper>
  )
}

export default SectionOne
