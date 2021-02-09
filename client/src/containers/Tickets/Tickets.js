import React, { useState } from 'react'

import TicketList from '../../components/Tickets/TicketList/TicketList';
import Button from '../../components/UI/Button/Button';
import NewTicket from '../../components/Tickets/NewTicket/NewTicket';

import './Tickets.css';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

const Tickets = () => {
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);

  return (
    <div className="TicketsContainer">
      { showNewTicketModal ? (
        <NewTicket
          handleCloseNewTicket={() => setShowNewTicketModal(false)}
        /> ):
        null }

      <TicketList />

      <Button 
        clickHandler={() => setShowNewTicketModal(true)}
        width={100}
        color="green"
        textColor="white"
        content="NEW"
      />
    </div>
  );
}

export default Tickets;