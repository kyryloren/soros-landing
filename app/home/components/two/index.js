'use client'

import { Container, DisplayText, LargeText, NormalText } from 'styles'
import {
  ContentContainer,
  MarqueeWrapper,
  SVGWrapper,
  SectionWrapper,
  SecurityGrid,
  SecurityWrapper,
  TextWrapper,
} from './styles'
import { useGSAP } from '@gsap/react'
import { forwardRef, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import OffersSVG from './offers'
import { Marquee } from 'components'

gsap.registerPlugin(ScrollTrigger)

const Icon = forwardRef(({}, ref) => (
  <svg
    width={160}
    height={177}
    viewBox="0 0 160 177"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
  >
    <g clipPath="url(#clip0_496_13170)">
      <g clipPath="url(#clip1_496_13170)">
        <path
          d="M80.2171 110.746V128.56M35.6814 70.9205C39.8804 70.664 45.057 70.664 51.7143 70.664H108.72C115.377 70.664 120.554 70.664 124.753 70.9205M35.6814 70.9205C30.4412 71.2403 26.7234 71.96 23.5501 73.5766C18.5221 76.1383 14.4343 80.2258 11.8724 85.2539C8.95996 90.9705 8.95996 98.4525 8.95996 113.418V125.888C8.95996 140.854 8.95996 148.336 11.8724 154.053C14.4343 159.081 18.5221 163.168 23.5501 165.73C29.2661 168.643 36.7488 168.643 51.7143 168.643H108.72C123.686 168.643 131.168 168.643 136.884 165.73C141.913 163.168 146 159.081 148.562 154.053C151.474 148.336 151.474 140.854 151.474 125.888V113.418C151.474 98.4525 151.474 90.9705 148.562 85.2539C146 80.2258 141.913 76.1383 136.884 73.5766C133.711 71.96 129.993 71.2403 124.753 70.9205M35.6814 70.9205V52.8497C35.6814 28.2533 55.6208 8.31396 80.2171 8.31396C104.813 8.31396 124.753 28.2533 124.753 52.8497V70.9205"
          stroke="#A267FF"
          strokeWidth={16.485}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_496_13170">
        <rect width={160} height={177} fill="white" />
      </clipPath>
      <clipPath id="clip1_496_13170">
        <rect width={160} height={177} fill="white" />
      </clipPath>
    </defs>
  </svg>
))

const SectionTwo = () => {
  const sectionRef = useRef()
  const paragraphRef = useRef([])
  const SVGRef = useRef()

  const gridSize = 31 // Define the grid size (e.g., 20x20)
  const items = Array.from({ length: gridSize * gridSize })
  const itemRefs = useRef([])
  const gridRef = useRef()
  const securityWrapperRef = useRef()
  const marqueeWrapperRef = useRef()

  useGSAP(() => {
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top-=100% top',
        end: 'bottom+=5000 bottom',
        scrub: 0.5,
        pin: true,
      },
    })

    function introZoom() {
      let tl = gsap.timeline()
      tl.fromTo('#List', { scale: 0 }, { scale: 2, duration: 1 }, 0)
        .from(
          '#profile1',
          { y: -400, opacity: 0, rotate: 30, duration: 0.7 },
          0.1,
        )
        .from(
          '#profile2',
          { y: -500, opacity: 0, rotate: 25, duration: 0.7 },
          0.15,
        )
        .from(
          '#profile3',
          { y: -600, opacity: 0, rotate: 20, duration: 0.7 },
          0.2,
        )
        .from(
          '#profile4',
          { y: -700, opacity: 0, rotate: 15, duration: 0.7 },
          0.25,
        )
      return tl
    }

    function scollThrough() {
      let tl = gsap.timeline()
      tl.to('#List', { yPercent: -100, duration: 1 })
      return tl
    }

    function exitZoom() {
      let tl = gsap.timeline()
      tl.to(
        gsap.utils.toArray([
          '#profile1',
          '#profile2',
          '#profile3',
          '#profile4',
        ]),
        { y: 0, duration: 0.7, stagger: 0.2 },
        0,
      )
        .to('#List', { yPercent: 0, scale: 1, duration: 1 }, 0)
        .to('#elements', { opacity: 1, duration: 0.4 }, 0.4)
        .to(
          '#color_wrapper',
          { fill: 'rgba(255, 255, 255, 1)', duration: 0.6 },
          0.2,
        )
      return tl
    }

    function animateSecurityIcons() {
      let tl = gsap.timeline()
      const centerX = (gridSize - 1) / 2
      const centerY = (gridSize - 1) / 2

      // Calculate the index of the central item
      const centerIndex = centerY * gridSize + centerX

      // Animate the central item from scale 3 to scale 1
      tl.fromTo(itemRefs.current[centerIndex], { scale: 0 }, { scale: 1 }, 0)
        .fromTo(
          gridRef.current, // Target only the central item
          { scale: 10 },
          {
            scale: 1,
            duration: 1.5, // Adjust the duration as needed
          },
          '<55%',
        )
        .fromTo(
          itemRefs.current.filter((_, index) => index !== centerIndex), // Exclude the central item
          { scale: 0 },
          {
            scale: 1,
            stagger: {
              amount: 2,
              grid: [gridSize, gridSize],
              from: 'center',
            },
          },
          '<20%',
        )

      return tl
    }

    master
      .set(gsap.utils.toArray('#anim-text h1'), {
        transformOrigin: 'left center',
        scale: 0,
      })
      .set(securityWrapperRef.current, { autoAlpha: 0 })
      .set('#elements', { opacity: 0 })
      .set(paragraphRef.current[1], { opacity: 0 })
      .from(paragraphRef.current[0], { opacity: 0, duration: 0.4 }, 0)
      .fromTo(
        paragraphRef.current[0],
        { yPercent: 100 },
        { yPercent: -100, duration: 2 },
        0,
      )
      .to(paragraphRef.current[0], { opacity: 0, duration: 1 }, 1)
      .add(introZoom(), 0)
      .add(scollThrough(), 1) // adjust to start after the text animations have begun
      .to(paragraphRef.current[1], { opacity: 1, duration: 1 }, 1.5)
      .fromTo(
        paragraphRef.current[1],
        { yPercent: 100 },
        { yPercent: 0, duration: 2 },
        1.5,
      )
      .add(exitZoom(), 2) // synchronize the exit animation with the end of text animations
      .to(
        SVGRef.current,
        { opacity: 0, yPercent: -40, xPercent: 20, duration: 0.5 },
        3,
      )
      .to(
        paragraphRef.current[1].children,
        { opacity: 0, yPercent: -40, xPercent: -20, duration: 0.5 },
        3,
      )
      .to(securityWrapperRef.current, { autoAlpha: 1 }, 3)
      .add(animateSecurityIcons(), 4.5) // add the security icons animation at the appropriate time
      .add(() => {
        console.log(master.scrollTrigger.direction)
        if (master.scrollTrigger.direction === 1) {
          gsap.to(gsap.utils.toArray('#anim-text h1'), {
            scale: 1,
            stagger: 0.2,
            duration: 0.5,
          })
        } else {
          gsap.to(gsap.utils.toArray('#anim-text h1'), {
            scale: 0,
            stagger: 0.2,
            duration: 0.5,
          })
        }
      }, 4)
  }, [])

  return (
    <SectionWrapper ref={sectionRef} className="section-one">
      <MarqueeWrapper ref={marqueeWrapperRef}>
        <Marquee repeat={4} duration={4} id={'anim-text'}>
          <DisplayText $m={'0 2vw 0 0'}>Security built in.</DisplayText>
        </Marquee>
      </MarqueeWrapper>
      <SecurityWrapper ref={securityWrapperRef}>
        <SecurityGrid ref={gridRef} gridSize={gridSize}>
          {items.map((_, index) => {
            return (
              <Icon key={index} ref={(el) => (itemRefs.current[index] = el)} />
            )
          })}
        </SecurityGrid>
      </SecurityWrapper>
      <Container>
        <ContentContainer>
          <TextWrapper ref={(el) => paragraphRef.current.push(el)}>
            <LargeText>
              Custom <br /> requests
            </LargeText>
            <NormalText>
              Send stores unlimited requests to customize your favorite
              products.
            </NormalText>
          </TextWrapper>
          <TextWrapper ref={(el) => paragraphRef.current.push(el)}>
            <LargeText>
              Get matched <br /> automatically
            </LargeText>
            <NormalText>
              Get accurate match ratings for your custom products using our AI.
            </NormalText>
          </TextWrapper>
          <SVGWrapper ref={SVGRef}>
            <OffersSVG />
          </SVGWrapper>
        </ContentContainer>
      </Container>
    </SectionWrapper>
  )
}

export default SectionTwo
