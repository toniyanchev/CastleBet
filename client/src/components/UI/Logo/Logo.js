import React from 'react'

import { castleLogo } from '../../Auth/images';

const Logo = props => {
  const { pxWidth, pxHeight, clickHandler } = props;

  return (
    <img
      src={castleLogo}
      alt="castle logo"
      onClick={() => clickHandler()}
      style={{width: `${pxWidth}px`, height: `${pxHeight}px`}}
    />
  )
}

export default Logo;