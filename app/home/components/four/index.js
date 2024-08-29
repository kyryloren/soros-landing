'use client'

import { Container, LargeText } from 'styles'
import { GridWrapper, ImageWrapper, Row, SectionWrapper } from './styles'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

const SectionFour = () => {
  const sectionRef = useRef()
  const rowsRef = useRef([])

  useGSAP(() => {
    rowsRef.current.forEach((row, index) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top bottom-=10%',
          end: 'bottom bottom-=10%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.set(row.firstChild, { transformOrigin: 'center bottom' }).set(
        row.lastChild,
        {
          transformOrigin: 'center bottom',
          duration: 1.5,
          delay: 0.1,
        },
      )

      tl.from(row.firstChild, { opacity: 0, scale: 0 }, 0).from(
        row.lastChild,
        { opacity: 0, scale: 0, duration: 0.5, delay: 0.1 },
        0,
      )
    })
  }, [])

  return (
    <SectionWrapper ref={sectionRef} className="section-four">
      <Container>
        <GridWrapper>
          <Row ref={(el) => rowsRef.current.push(el)}>
            <ImageWrapper>
              <Image
                src={'/abstract/1.webp'}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </ImageWrapper>
            <LargeText>
              No KYC. <span>We never</span>
              <br />
              <span>collect or store</span>
              <br />
              <span>your personal info.</span>
            </LargeText>
          </Row>

          <Row ref={(el) => rowsRef.current.push(el)}>
            <ImageWrapper>
              <Image
                src={'/abstract/2.webp'}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </ImageWrapper>
            <LargeText>
              Transactions are
              <br />
              decentralized <span>and</span>
              <br />
              <span>impossible to track.</span>
            </LargeText>
          </Row>

          <Row ref={(el) => rowsRef.current.push(el)}>
            <ImageWrapper>
              <Image
                src={'/abstract/3.webp'}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </ImageWrapper>
            <LargeText>
              <span>Orders, messages,</span>
              <br />
              <span>and transactions</span>
              <br />
              <span>are</span> encrypted.
            </LargeText>
          </Row>

          <Row ref={(el) => rowsRef.current.push(el)}>
            <ImageWrapper>
              <Image
                src={'/abstract/4.webp'}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </ImageWrapper>
            <LargeText>
              Build trust <span>on</span>
              <br />
              <span>feedback and</span>
              <br />
              <span>transactions.</span>
            </LargeText>
          </Row>
        </GridWrapper>
      </Container>
    </SectionWrapper>
  )
}

export default SectionFour
