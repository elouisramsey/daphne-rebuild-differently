import React from 'react'
import { motion } from 'framer-motion'

const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
})

export async function getStaticPaths() {
  const data = await client.getEntries({
    content_type: 'daphne'
  })
  return {
    paths: data.items.map((item) => ({
      params: { name: item.fields.name }
    })),
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const data = await client.getEntries({
    content_type: 'daphne',
    'fields.name': params.name
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

const Name = ({ data }) => {
  return (
    <motion.div initial='initial' animate='animate' exit={{ opacity: 0 }}>
      {data.map((item) => (
        <div className='h-screen' key={item.fields.name}>
          <div className='grid-cols-2 place-content-center h-full grid'>
            <motion.div
              className='flex items-center justify-center'
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            >
              <motion.img
                key={item.fields.name}
                src={item.fields.background.fields.file.url}
                animate={{ x: 0, opacity: 1 }}
                initial={{ x: 200, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
              />
            </motion.div>
            <div className='yes'>yes!!!</div>
          </div>
        </div>
      ))}
    </motion.div>
  )
}

export default Name
