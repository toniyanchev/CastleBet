import React from 'react'

import './Backdrop.css';

const Backdrop = props => (
  <div
    className="Backdrop"
    onClick={() => props.clickHandler()}
  ></div>
);

export default Backdrop;