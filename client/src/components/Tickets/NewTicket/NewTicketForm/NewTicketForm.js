import React, { useState, useContext } from "react";
import postFetch from "../../../../fetches/postFetch";
import { UserContext } from "../../../../contexts/User/UserContext";
import Button from "../../../UI/Button/Button";
import "./NewTicketForm.css";

const CREATE_TICKET = `${process.env.REACT_APP_API}/ticket/create`;

const NewTicketForm = (props) => {
  const { created } = props;
  const userData = useContext(UserContext);

  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);

  const createTicket = () => {
    const req = {
      userId: userData.user.id,
      title: title,
      content: message,
    };
    postFetch(CREATE_TICKET, req, userData.token).then((data) =>
      data.httpStatus === 200 ? created() : window.alert("Could not create!")
    );
  };

  return (
    <div className="NewTicketFormWrapper">
      <input
        placeholder="Ticket title"
        className="NewTicketFormTitle"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Message"
        className="NewTicketFormMessage"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        clickHandler={() => createTicket()}
        width={80}
        color={"green"}
        textColor={"white"}
        content={"CREATE TICKET"}
        margin
      />
    </div>
  );
};

export default NewTicketForm;
