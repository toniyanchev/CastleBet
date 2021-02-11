import React, { useState, useContext } from 'react'
import Button from '../../../UI/Button/Button';
import './MessageReply.css';
import postFetch from '../../../../fetches/postFetch';
import { UserContext } from '../../../../contexts/User/UserContext';

const CLOSE_TICKET = `http://localhost:4000/ticket/close`;
const ADD_TICKET_MESSAGE = `http://localhost:4000/ticket/reply`

const MessageReply = props => {
  const { ticketId, reply, close } = props;

  const userData = useContext(UserContext);
  const [message, setMessage] = useState("");

  const closeTicket = (reqBody) => {
    postFetch(CLOSE_TICKET, reqBody, userData.token);
    close();
  }
  
  const replyToTicket = (reqBody) => {
    if (message === "" || message === null) {
      return;
    }
    postFetch(ADD_TICKET_MESSAGE, reqBody, userData.token)
      .then(data => {
        if (data.httpStatus === 200) {
          reply();
        }
      });
    
    setMessage("")
  }

  return (
    <div className="MessageReplyWrapper">
      { userData.user.userType === "admin" ?
        <Button
          clickHandler={() => closeTicket({
            ticketId: ticketId,
            userId: userData.user.id
          })}
          width={100}
          color="red"
          textColor="white"
          content="CLOSE TICKET"
        /> :
        null
      }
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        clickHandler={() => replyToTicket({
          userId: userData.user.id,
          content: message, ticketId: ticketId
        })}
        width={80}
        color="green"
        textColor="white"
        content="SEND"
      />
    </div>
  );
}

export default MessageReply;