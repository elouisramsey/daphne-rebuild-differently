import React, { useState, useEffect, useRef } from 'react'
import ImgComp from '../components/slider/ImgComp'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import composeRefs from '@seznam/compose-react-refs'
import { motion } from 'framer-motion'
import Link from 'next/link'

export async function getStaticProps() {
  const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
  })

  const data = await client.getEntries({
    content_type: 'daphne'
  })

  return {
    props: {
      data: data.items
    }
  }
}
let easing = [0.6, -0.05, 0.01, 0.99]

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
}

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing }
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing
    }
  }
}

const Index = ({ data }) => {
  const ref = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  const [sliderRef] = useKeenSlider({
    slidesPerView: 1,
    centered: true,
    vertical: true,
    loop: true,
    mounted: () => setIsMounted(true),
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    }
  })

  const postVariants = {
    initial: { scale: 0.96, y: 30, opacity: 0 },
    enter: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] }
    },
    exit: {
      scale: 0.6,
      y: 100,
      opacity: 0,
      transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] }
    }
  }

  return (
    <motion.div>
      <div
        className='w-full h-screen flex items-center relative overflow-hidden keen-slider'
        ref={composeRefs(sliderRef, ref)}
      >
        <div
          className='cursor '
          style={{ transform: 'translate3d(1066px, -25px, 0px)' }}
        />
        {data.map((item, index) => (
          <motion.section
            initial='initial'
            animate='enter'
            exit='exit'
            variants={{ exit: { transition: { staggerChildren: 0.1 } } }}
            ref={ref}
            key={item.fields.name}
            className='min-w-full relative h-full keen-slider__slide'
          >
            <ImgComp src={item.fields.background.fields.file.url} />

            <nav className='absolute left-1/100 p-4 z-100 grid pb-8 grid-rows-7'>
              <motion.div
                layoutId='topic'
                className={`nav-item grid text-white relative bottom-24 left-8 uppercase
              font-bold font-Alasar `}
              >
                {item.fields.name}
              </motion.div>
            </nav>
            <ul className='capitalize absolute font-sharpsans bottom-12 text-white shades text-base left-48'>
              {item.fields.shades.map((item, index) => (
                <motion.li key={item} className='shade' variants={{ fadeInUp }}>
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.h1 className='capitalize absolute font-sharpsans bottom-12 text-white shades text-base right-12'>
              {index + 1}/{data.length}
            </motion.h1>

            <Link scroll={false} href='/[name]' as={`/${item.fields.name}`}>
              <a>
                <motion.div
                  whileHover='hover'
                  variants={{ hover: { scale: 1.2 }, fadeInUp }}
                  className='circle'
                  transition={{ ease: 'easeOut', duration: 2 }}
                >
                  <div className='circle-small' />
                  <span>Enter</span>
                </motion.div>
              </a>
            </Link>
          </motion.section>
        ))}
      </div>
    </motion.div>
  )
}

export default Index
