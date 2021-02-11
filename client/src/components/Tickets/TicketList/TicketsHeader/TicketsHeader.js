import React from 'react'

import './TicketsHeader.css';

const TicketsHeader = () => {
  return (
    <div className="TicketsHeaderWrapper">
      <div style={{ width: "15%" }}>Status</div>
      <div style={{ width: "20%" }}>Created on</div>
      <div style={{ width: "45%" }}>Title</div>
      <div style={{ width: "20%" }}>Last modified</div>
    </div>
  );
}

export default TicketsHeader;