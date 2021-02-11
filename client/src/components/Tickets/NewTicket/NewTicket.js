import React from 'react'

import Backdrop from '../../UI/Backdrop/Backdrop';
import NewTicketForm from './NewTicketForm/NewTicketForm';

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

        <NewTicketForm
          created={() => handleCloseNewTicket()}
        />
      </div>
    </div>
  )
};

export default NewTicket;