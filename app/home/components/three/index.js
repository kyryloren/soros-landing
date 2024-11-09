'use client'

import { useRef } from 'react'
import Image from 'next/image'
import {
  GalleryWrapper,
  GridWrapper,
  ImageWrapper,
  RowsWrapper,
  ScaleWrapper,
  SectionWrapper,
  TextWrapper,
} from './styles'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container, NormalText } from 'styles'

gsap.registerPlugin(ScrollTrigger)

const SectionThree = () => {
  let sectionRef = useRef()
  let grids = useRef([])
  let galleryRef = useRef()

  useGSAP(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        scrub: true,
        start: 'bottom bottom',
        end: '+=1000',
        pin: true,
        markers: true,
      },
    })

    tl.to(galleryRef.current, { scale: 1 })
  }, [])

  useGSAP(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        scrub: true,
        start: 'top-=100% top',
        end: '+=3000',
      },
    })

    tl.fromTo(grids.current[0], { left: '-40%' }, { left: '0%' }, 0).fromTo(
      grids.current[1],
      { left: '-3%' },
      { left: '-40%' },
      0,
    )
  }, [])

  return (
    <SectionWrapper ref={sectionRef} className="section-three">
      <Container _height={'unset'}>
        <TextWrapper>
          <NormalText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna.
          </NormalText>
        </TextWrapper>
      </Container>
      <GalleryWrapper>
        <RowsWrapper>
          <ScaleWrapper ref={galleryRef}>
            <GridWrapper ref={(el) => grids.current.push(el)}>
              <ImageWrapper>
                <Image src={'/grid/10.webp'} fill />
              </ImageWrapper>
              <ImageWrapper>
                <Image src={'/grid/11.webp'} fill />
              </ImageWrapper>
              <ImageWrapper>
                <Image src={'/grid/12.webp'} fill />
              </ImageWrapper>
              <ImageWrapper>
                <Image src={'/grid/13.webp'} fill />
              </ImageWrapper>
            </GridWrapper>
            <GridWrapper ref={(el) => grids.current.push(el)}>
              <ImageWrapper>
                <Image src={'/grid/14.webp'} fill />
              </ImageWrapper>
              <ImageWrapper>
                <Image src={'/grid/15.webp'} fill />
              </ImageWrapper>
              <ImageWrapper>
                <Image src={'/grid/19.webp'} fill />
              </ImageWrapper>
              <ImageWrapper>
                <Image src={'/grid/18.webp'} fill />
              </ImageWrapper>
            </GridWrapper>
          </ScaleWrapper>
        </RowsWrapper>
      </GalleryWrapper>
    </SectionWrapper>
  )
}

export default SectionThree
