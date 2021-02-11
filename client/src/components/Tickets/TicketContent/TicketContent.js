import React, { useEffect, useState, useContext } from 'react'
import postFetch from '../../../fetches/postFetch';
import { UserContext } from '../../../contexts/User/UserContext';
import Backdrop from '../../UI/Backdrop/Backdrop';
import TicketMessage from './TicketMessage/TicketMessage';
import MessageReply from './MessageReply/MessageReply';
import { filterMessage } from './TicketMessage/helpers';
import './TicketContent.css';

const GET_TICKET_MESSAGES = `http://localhost:4000/ticket/get-messages`;

const TicketContent = props => {
  const { ticket, handleClose } = props;
  const userData = useContext(UserContext);

  const [ticketMessages, setTicketMessages] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    postFetch(GET_TICKET_MESSAGES, { ticketId: ticket.id }, userData.token)
      .then(data => setTicketMessages(data));
  }, [ticket.id, userData.token, refresh]);

  return (
    <div className="TicketContentWrapper">
      <Backdrop clickHandler={() => handleClose()}/>
      <div className="TicketContent">
        <div
          className="TicketContentCloseButton"
          onClick={() => handleClose()} >X</div>
        
        <div className="TicketMessagesWrapper">
        {
          ticketMessages.map(msg =>
            <TicketMessage
              key={msg.id}
              message={msg}
              property={filterMessage(msg, userData.user.userType)}
            />
          )
        }
        </div>
        <MessageReply
          ticketId={ticket.id}
          reply={() => setRefresh(!refresh)}
        />
      </div>
    </div>
  );
}

export default TicketContent;