import React, { useState, useEffect, useRef } from 'react'
import ImgComp from './ImgComp'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import composeRefs from '@seznam/compose-react-refs'
import { motion } from 'framer-motion'

export async function getStaticProps() {
  const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
  })

  const nawa = await client.getEntries({
    content_type: 'daphne'
  })

  return {
    props: {
      data: nawa
    }
  }
}

const Slider = ({ data }) => {
  console.log(data)
  const slider = [
    {
      bg: (
        <ImgComp src='https://res.cloudinary.com/elouisramsey/image/upload/f_auto,q_auto/v1609807529/daphne/models_iguz7b.jpg' />
      ),
      topic: 'beauty',
      shades: [
        'cream',
        'nude',
        'rose dust',
        'pastel',
        '1,2,3',
        'strawberry flavor'
      ]
    },
    {
      bg: (
        <ImgComp src='https://res.cloudinary.com/elouisramsey/image/upload/f_auto,q_auto/v1609807529/daphne/makeup_z62fky.jpg' />
      ),
      topic: 'works',
      shades: [
        'beauty',
        'texture',
        'still life',
        'sport',
        'fashion',
        'culinary',
        'portrait'
      ]
    },
    {
      bg: (
        <ImgComp src='https://res.cloudinary.com/elouisramsey/image/upload/f_auto,q_auto/v1609807529/daphne/chinese_xfdvqb.jpg' />
      ),
      topic: 'fashion',
      shades: [
        'flower bud',
        'origami',
        'shades of memory dew',
        'the other',
        'pieces of fabric',
        'girls of the wind',
        'bloom'
      ]
    },
    {
      bg: (
        <ImgComp src='https://res.cloudinary.com/elouisramsey/image/upload/f_auto,q_auto/v1609807529/daphne/horses_ctx3ik.jpg' />
      ),
      topic: 'outdoor',
      shades: ['blanc de clanc', 'ireland', 'way of life', 'maisonnettes']
    },
    {
      bg: (
        <ImgComp src='https://res.cloudinary.com/elouisramsey/image/upload/f_auto,q_auto/v1609807529/daphne/ballet_zmeksv.jpg' />
      ),
      topic: 'dance',
      shades: ['dab', 'twist', 'joy']
    }
  ]
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
        {slider.map((item, index) => (
          <motion.section
            initial='initial'
            animate='enter'
            exit='exit'
            variants={{ exit: { transition: { staggerChildren: 0.1 } } }}
            ref={ref}
            key={index}
            className='min-w-full relative h-full keen-slider__slide'
          >
            {item.bg}

            <nav className='absolute left-1/100 p-4 z-100 grid pb-8 grid-rows-7'>
              <motion.div
                layoutId='topic'
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`nav-item grid text-white relative bottom-29 left-8 uppercase
              font-bold font-Alasar `}
              >
                {item.topic}
              </motion.div>
            </nav>
            <ul className='capitalize absolute font-sharpsans bottom-12 text-white shades text-base left-48'>
              {item.shades.map((item, index) => (
                <li key={index} className='shade'>
                  {item}
                </li>
              ))}
            </ul>
            <h1 className='capitalize absolute font-sharpsans bottom-12 text-white shades text-base right-12'>
              {index + 1}/{slider.length}
            </h1>
          </motion.section>
        ))}

        <motion.div
          whileHover='hover'
          variants={{ hover: { scale: 1.2 } }}
          className='circle'
        >
          <div className='circle-small' />
          <span>Enter</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Slider
