import React from 'react'
import './TicketMessage.css';
import { getMessageTime } from './helpers';

const TicketMessage = props => {
  const{ message, property } = props;
  return (
    <div className={property === "received" ? "ReceivedTicketMessageWrapper" : "SentTicketMessageWrapper"}>
      <div
        className={property === "received" ? "ReceivedTicketMessage" : "SentTicketMessage"}
      >{message.content}</div>

      <div className={property === "received" ? "ReceivedMessageTime" : "SentMessageTime"}
      >{getMessageTime(message.date)}</div>

    </div>
  );
}

export default TicketMessage;