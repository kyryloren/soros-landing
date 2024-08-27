'use client'

import { useRef, useState } from 'react'
import { HugeText } from 'styles'
import {
  MovementWrapper,
  SectionWrapper,
  TextWrapper,
  SingleImageWrapper,
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
  const imgRef = useRef(null)
  const sectionRef = useRef(null)
  const para1Ref = useRef()
  const para2Ref = useRef()
  const cardImages = useRef([])

  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)

  const images = useRef(generateImagePaths()).current

  const updateFrameIndex = (index) => {
    setCurrentFrameIndex(index)
  }

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top+4px top',
        end: '+=6500',
        scrub: 1,
        pin: true,
        onUpdate: ({ progress }) => {
          if (progress >= 0.1) {
            const adjustedProgress = (progress - 0.1) * 2
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
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        },
        0.0001,
      )
      .fromTo(
        para1Ref.current,
        { autoAlpha: 0.5, scale: 0.2 },
        { autoAlpha: 1, scale: 1 },
        0.0001,
      )
      .fromTo(imgRef.current, { top: '100%' }, { top: '0%' }, 0.5)
      .set(para1Ref.current, { display: 'none' }, 1)
      .set(para2Ref.current, { display: 'block' }, 1)
      .to(imgRef.current, { top: '-80%' }, 1.3)
      .to(para2Ref.current, { xPercent: -80 }, 1.6)
      .to(
        cardImages.current[0],
        {
          top: '25%',
          right: '22%',
          transform: 'translateY(-25%)',
        },
        1.6,
      )
      .to(
        cardImages.current[1],
        {
          top: '45%',
          right: '12%',
          transform: 'translateY(-45%)',
        },
        1.8,
      )
      .to(
        cardImages.current[2],
        {
          top: '70%',
          right: '30%',
          transform: 'translateY(-70%)',
        },
        2,
      )
      .fromTo(
        sectionRef.current,
        { scale: 1, borderRadius: 0 },
        {
          scale: 0.95,
          borderRadius: 40,
        },
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
      .to(document.querySelector('.section-one'), { yPercent: -100 }, 2.1)
  }, [])

  return (
    <SectionWrapper ref={sectionRef}>
      <MovementWrapper ref={imgRef}>
        {images.map((src, index) => (
          <SingleImageWrapper
            key={index}
            style={{
              visibility: index === currentFrameIndex ? 'visible' : 'hidden',
            }}
          >
            <img src={src} alt={`Frame ${index + 1}`} />
          </SingleImageWrapper>
        ))}
      </MovementWrapper>
      <TextWrapper>
        <HugeText ref={para1Ref}>
          Works just like
          <br />
          your favorite stores.
        </HugeText>
        <div ref={para2Ref}>
          <HugeText>Has all the</HugeText>
          <HugeText>brands you love.</HugeText>
        </div>
      </TextWrapper>
      <CardWrapper ref={(el) => cardImages.current.push(el)}>
        <img src="/cards/card-one.svg" />
      </CardWrapper>
      <CardWrapper ref={(el) => cardImages.current.push(el)}>
        <img src="/cards/card-two.svg" />
      </CardWrapper>
      <CardWrapper ref={(el) => cardImages.current.push(el)}>
        <img src="/cards/card-three.svg" />
      </CardWrapper>
    </SectionWrapper>
  )
}

export default SectionOne
