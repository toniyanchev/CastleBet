import React, { useContext, useState } from 'react'
import { UserContext } from '../../contexts/User/UserContext';

import TicketList from '../../components/Tickets/TicketList/TicketList';
import Button from '../../components/UI/Button/Button';
import NewTicket from '../../components/Tickets/NewTicket/NewTicket';
import TicketContent from '../../components/Tickets/TicketContent/TicketContent';

import './Tickets.css';

const Tickets = () => {
  const userData = useContext(UserContext);

  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [showTicketContentModal, setShowTicketContentModal] = useState(false);
  const [openedTicket, setOpenedTicket] = useState(null);

  const openTicketContent = ticket => {
    setOpenedTicket(ticket);
    setShowTicketContentModal(true);
  }
  const closeTicketContent = () => {
    setOpenedTicket(null);
    setShowTicketContentModal(false);
  }

  return (
    <div className="TicketsContainer">
      { showNewTicketModal ? (
        <NewTicket
          handleCloseNewTicket={() => setShowNewTicketModal(false)}
        /> ):
        null }

      {
        showTicketContentModal ?
          <TicketContent
            ticket={openedTicket}
            handleClose={() => closeTicketContent()}
          /> :
          null
      }

      <TicketList openTicketHandler={(t) => openTicketContent(t)} />

      {
        userData.user.userType === "client" ?
          <Button 
            clickHandler={() => setShowNewTicketModal(true)}
            width={100}
            color="green"
            textColor="white"
            content="NEW"
            margin
          /> :
          null
      }
    </div>
  );
}

export default Tickets;