import React from 'react'

import './NavigationItem.css';

const NavigationItem = props => {
  const { name, handleClick } = props;

  return (
    <li
      className="NavigationItemWrapper"
      onClick={() => handleClick()}
    >
      {name}
      {props.children}
    </li>
  );
}

export default NavigationItem;