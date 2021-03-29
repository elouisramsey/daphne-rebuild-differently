import React from 'react'

const imgComp = ({ src, index, topic }) => {
  const imgStyles = {
    width: 100 + '%',
    height: 100 + '%',
    backgroundImage: 'url(' + src + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'top'
  }

  return <div style={imgStyles} key={index} topic={topic} />
}

export default imgComp
