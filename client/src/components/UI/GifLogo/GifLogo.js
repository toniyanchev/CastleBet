import React from 'react'

import { castleAnimation } from '../../Auth/images';

const GifLogo = props => {
  const { pxWidth, pxHeight, clickHandler } = props;

  return (
    <img
      src={castleAnimation}
      alt="castle gif logo"
      onClick={() => clickHandler()}
      style={{width: `${pxWidth}px`, height: `${pxHeight}px`}}
    />
  )
}

export default GifLogo;