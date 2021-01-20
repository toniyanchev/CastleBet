import React from 'react';

import { castleLogo } from '../../images';

import './RegisterHeader.css';

const RegisterHeader = () => {

  return (
  <div className="RegisterHeaderWrapper">
    <img
      className="RegisterHeaderLogo"
      src={castleLogo}
      alt="CastleLogo"
    />
  </div>
  );
}

export default RegisterHeader;