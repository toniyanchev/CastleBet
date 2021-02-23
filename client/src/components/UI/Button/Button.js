import React from 'react'

import './Button.css';

const Button = props => {
  const { clickHandler, width, color, textColor, margin, content } = props;

  return (
    <button
      className="CustomButton"
      style={{
        width: `${width}px`,
        height: `${width / 2}px`,
        backgroundColor: color,
        color: textColor,
        marginTop: margin ? "20px" : "0px"
      }}
      onClick={() => clickHandler()}
    >
      {content}
    </button>
  )
}

export default Button;