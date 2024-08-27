'use client'

import { useRef } from 'react'
import {
  DescriptionWrapper,
  HeroContainer,
  LinkWrapper,
  MiddleLine,
  SectionWrapper,
  TopLine,
} from './styles'
import PatternGrid from './pattern'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import WordMarkIcon from './wordmark'
import { DisplayText, NormalText } from 'styles'
import { CustomButton } from 'components'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const sectionRef = useRef()
  const bgRef = useRef()
  const line1Ref = useRef()
  const line2Ref = useRef()

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=1200',
        scrub: true,
        pin: true,
      },
    })

    timeline
      .to(line1Ref.current, { yPercent: -150 }, 0)
      .to(line2Ref.current, { yPercent: 150 }, 0)
  }, [])

  return (
    <SectionWrapper ref={sectionRef}>
      <HeroContainer>
        <TopLine ref={line1Ref}>
          <DisplayText>
            The future of
            <br />
            shopping is crypto
          </DisplayText>
          <DescriptionWrapper>
            <NormalText>
              Shop for your favorite products and checkout with Bitcoin,
              Etherium, or any other crypto currency.
            </NormalText>
            <CustomButton>Experience beta</CustomButton>
          </DescriptionWrapper>
        </TopLine>
        <MiddleLine>
          <LinkWrapper>
            <NormalText>Instagram</NormalText>
            <NormalText>Twitter (X)</NormalText>
            <NormalText>LinkedIn</NormalText>
          </LinkWrapper>
          <NormalText>Scroll for more</NormalText>
        </MiddleLine>
        <div ref={line2Ref}>
          <WordMarkIcon />
        </div>
      </HeroContainer>
      <PatternGrid />
    </SectionWrapper>
  )
}

export default Hero
