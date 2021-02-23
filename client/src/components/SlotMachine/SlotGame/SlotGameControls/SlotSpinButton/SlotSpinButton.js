import React from 'react'

import './SlotSpinButton.css';

const SlotSpinButton = props => {
  const { handleClick } = props;
  return (
    <button
      className="SlotSpinButton"
      onClick={() => handleClick()}
    >
      SPIN
    </button>
  );
}

export default SlotSpinButton;