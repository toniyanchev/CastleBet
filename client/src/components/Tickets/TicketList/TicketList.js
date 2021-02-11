import React, { useState, useEffect, useContext } from 'react'

import postFetch from '../../../fetches/postFetch';
import getFetch from '../../../fetches/getFetch';
import { UserContext } from '../../../contexts/User/UserContext';

import Ticket from './Ticket/Ticket';
import TicketsHeader from './TicketsHeader/TicketsHeader';

import './TicketList.css';

const GET_CLIENT_TICKETS = `http://localhost:4000/ticket/get`
const GET_ADMIN_TICKETS = `http://localhost:4000/ticket/get-for-admin`

const TicketList = props => {
  const { openTicketHandler, refresh } = props;
  const userData = useContext(UserContext);

  const [userTickets, setUserTickets] = useState([]);
  console.log(`refresh before fetch: ${refresh}`);
  useEffect(() => {
    if (userData.user.userType === "admin") {
      getFetch(GET_ADMIN_TICKETS, userData.token)
        .then(data => setUserTickets(data));
    }
    if (userData.user.userType === "client") {
      postFetch(GET_CLIENT_TICKETS, { userId: userData.user.id}, userData.token)
        .then(data => setUserTickets(data));
    }
  }, [userData, refresh]);
  console.log("tickets before render:");
  console.log(userTickets);

  return (
    <div className="TicketListWrapper">
      <TicketsHeader />
      {userTickets.map(ticket =>
        <Ticket
          key={ticket.id}
          ticket={ticket}
          handleClick={() => openTicketHandler(ticket)}
        />
      )}
    </div>
  );
}

export default TicketList;