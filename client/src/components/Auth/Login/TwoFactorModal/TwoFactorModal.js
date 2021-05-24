import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./TwoFactorModal.css";
import postFetch from "../../../../fetches/postFetch";
import { UserContext } from "../../../../contexts/User/UserContext";
import Backdrop from "../../../UI/Backdrop/Backdrop";

const AUTHENTICATE_USER = `${process.env.REACT_APP_API}/users/authenticate`;

const TwoFactorModal = (props) => {
  const { username, password, handleClose } = props;
  let history = useHistory();

  const userData = useContext(UserContext);

  const [code, setCode] = useState(null);

  const checkCode = () => {
    let user = {
      username: username,
      password: password,
      code: +code,
    };

    postFetch(AUTHENTICATE_USER, user).then((data) => {
      if (data.httpStatus === 200) {
        userData.setToken(data.token);
        userData.setUser({
          id: data.id,
          username: data.username,
          balance: data.balance,
          userType: data.userType,
        });
        history.push("/");
        toast.success("Logged in!");
        handleClose();
      } else {
        toast.error("Wrong code!");
      }
    });
  };

  return (
    <div className="TwoFactorModalWrapper">
      <Backdrop clickHandler={() => handleClose()} />
      <div className="TwoFactorModal">
        <div>{`Hello ${username}, please enter the code sent to your e-mail.`}</div>
        <input
          placeholder="CODE:"
          style={{
            zIndex: 2,
            margin: "10px",
            width: "100px",
            textAlign: "center",
          }}
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button style={{ zIndex: 2 }} onClick={() => checkCode()}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default TwoFactorModal;
