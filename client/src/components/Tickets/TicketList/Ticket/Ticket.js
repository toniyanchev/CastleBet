import React, { useState, useEffect } from 'react'

import { formatDate } from '../../helpers';

import './Ticket.css';

const Ticket = props => {
  const { ticket, handleClick } = props;

  const [statusColor, setStatusColor] = useState("");

  useEffect(() => {
    switch(ticket.status) {
      case "requested":
        setStatusColor("RequestedStatusBox");
        break;
      case "opened":
        setStatusColor("OpenedStatusBox");
        break;
      case "closed":
        setStatusColor("ClosedStatusBox");
        break;
      default:
        setStatusColor("");
        break;
    }
  }, [ticket.status])

  return (
    <div
      className="TicketWrapper"
      onClick={() => handleClick()}
    >
      <div className="TicketStatus">
        <div className={statusColor}></div>
        {ticket.status}
        </div>
      <div className="TicketDates">{formatDate(ticket.originDate)}</div>
      <div className="TicketTitle">{ticket.title}</div>
      <div className="TicketDates">{formatDate(ticket.lastActionDate)}</div>
    </div>
  )
}

export default Ticket;