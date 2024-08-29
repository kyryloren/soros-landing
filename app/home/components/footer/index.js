'use client'

import { LargeText, NormalText } from 'styles'
import {
  BottomContainer,
  CustomInput,
  InnerLogoWrapper,
  InputContainer,
  LinksWrapper,
  LittleContainer,
  LogoWrapper,
  SectionWrapper,
} from './styles'
import SorosLogo from './soros'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import TextLogo from './text'

gsap.registerPlugin(ScrollTrigger)

const FooterSection = () => {
  const sectionRef = useRef()
  const logoRef = useRef()
  const textLogoRef = useRef()
  const textRef = useRef([])

  useGSAP(() => {
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=4000',
        scrub: true,
        pin: true,
      },
    })

    master
      .fromTo(
        logoRef.current,
        { rotation: 180 },
        { rotation: 0, duration: 5, delay: 0.5 },
        0,
      )
      .from(textRef.current, { opacity: 0, yPercent: 10, delay: 0.5 }, '<80%')
      .fromTo(
        logoRef.current,
        { scale: 2.5, bottom: '-110vh' },
        { scale: 1, bottom: '0', duration: 5, delay: 0.5 },
        0,
      )
      .fromTo(
        textLogoRef.current,
        { rotation: 160 },
        { rotation: -205, duration: 3, delay: 0.5 },
        0,
      )
  }, [])

  return (
    <SectionWrapper ref={sectionRef}>
      <LittleContainer>
        <InnerLogoWrapper ref={textLogoRef}>
          <TextLogo />
        </InnerLogoWrapper>
        <LogoWrapper ref={logoRef}>
          <SorosLogo />
        </LogoWrapper>
        <LargeText ref={(el) => textRef.current.push(el)}>
          We’d love to have you.
        </LargeText>
        <NormalText ref={(el) => textRef.current.push(el)}>
          Register now and be the first to get exclusive access.
        </NormalText>
      </LittleContainer>
      <InputContainer ref={(el) => textRef.current.push(el)}>
        <CustomInput
          type="email"
          placeholder="Type your email..."
          name="email"
        />
      </InputContainer>
      <BottomContainer ref={(el) => textRef.current.push(el)}>
        <NormalText>hello@shopsoros.com</NormalText>
        <LinksWrapper>
          <NormalText>Instagram</NormalText>
          <NormalText>Twitter (X)</NormalText>
          <NormalText>Telegram</NormalText>
        </LinksWrapper>
        <NormalText>SOROS &copy; 2024</NormalText>
      </BottomContainer>
    </SectionWrapper>
  )
}

export default FooterSection
