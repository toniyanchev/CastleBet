import React from 'react'

import './Button.css';

const Button = props => {
  const { clickHandler, width, color, textColor, content } = props;

  return (
    <button
      style={{
        width: `${width}px`,
        height: `${width / 2}px`,
        backgroundColor: color,
        color: textColor
      }}
      onClick={() => clickHandler()}
    >
      {content}
    </button>
  )
}

export default Button;