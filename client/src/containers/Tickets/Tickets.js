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
  const [refreshTicketList, setRefreshTicketList] = useState(false);

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
          handleCloseNewTicket={() => {
            setShowNewTicketModal(false);
            setRefreshTicketList(!refreshTicketList);
          }}
        /> ):
        null }

      {
        showTicketContentModal ?
          <TicketContent
            ticket={openedTicket}
            handleClose={() => closeTicketContent()}
            handleStatusChange={() => setRefreshTicketList(!refreshTicketList)}
          /> :
          null
      }
      <TicketList
        openTicketHandler={(t) => openTicketContent(t)}
        refresh={refreshTicketList}
      />

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