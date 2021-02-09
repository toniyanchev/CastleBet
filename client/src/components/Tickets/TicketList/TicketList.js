import React, { useState, useEffect, useContext } from 'react'

import postFetch from '../../../postFetch';
import { UserContext } from '../../../contexts/User/UserContext';

import Ticket from './Ticket/Ticket';

import './TicketList.css';

const GET_TICKETS = `http://localhost:4000/ticket/get`

const TicketList = () => {
  const userData = useContext(UserContext);

  const [userTickets, setUserTickets] = useState([]);

  useEffect(() => {
    postFetch(GET_TICKETS, { userId: userData.user.id})
      .then(data => setUserTickets(data));
  }, [userData.user.id]);

  return (
    <div className="TicketListWrapper">
      {userTickets.map(ticket => <Ticket ticket={ticket}/>)}
    </div>
  );
}

export default TicketList;