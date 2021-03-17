import React, { useEffect, useState, useContext } from "react";
import postFetch from "../../../fetches/postFetch";
import { UserContext } from "../../../contexts/User/UserContext";
import Backdrop from "../../UI/Backdrop/Backdrop";
import TicketMessage from "./TicketMessage/TicketMessage";
import MessageReply from "./MessageReply/MessageReply";
import { filterMessage } from "./TicketMessage/helpers";
import "./TicketContent.css";

const GET_TICKET_MESSAGES = `${process.env.REACT_APP_API}/ticket/get-messages`;

const TicketContent = (props) => {
  const { ticket, handleClose, handleStatusChange } = props;
  const userData = useContext(UserContext);

  const [ticketMessages, setTicketMessages] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    postFetch(
      GET_TICKET_MESSAGES,
      { ticketId: ticket.id },
      userData.token
    ).then((data) => setTicketMessages(data));
  }, [ticket.id, userData.token, refresh]);

  return (
    <div className="TicketContentWrapper">
      <Backdrop clickHandler={() => handleClose()} />
      <div className="TicketContent">
        <div className="TicketContentCloseButton" onClick={() => handleClose()}>
          X
        </div>

        <div className="TicketMessagesWrapper">
          {ticketMessages.map((msg) => (
            <TicketMessage
              key={msg.id}
              message={msg}
              property={filterMessage(msg, userData.user.userType)}
            />
          ))}
        </div>
        {ticket.status !== "closed" ? (
          <MessageReply
            ticketId={ticket.id}
            reply={() => {
              setRefresh(!refresh);
              handleStatusChange();
            }}
            close={() => {
              handleClose();
              handleStatusChange();
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default TicketContent;
