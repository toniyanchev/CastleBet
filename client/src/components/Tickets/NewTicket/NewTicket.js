import React from 'react'

import Backdrop from '../../UI/Backdrop/Backdrop';

import './NewTicket.css';

const NewTicket = props => {
  const { handleCloseNewTicket } = props;

  return (
    <div className="NewTicketWrapper">
      <Backdrop clickHandler={() => handleCloseNewTicket()}/>
      <div className="NewTicket">
        <div
          className="NewTicketCloseButton"
          onClick={() => handleCloseNewTicket()} >X</div> 
        Add Ticket
      </div>
    </div>
  )
};

export default NewTicket;