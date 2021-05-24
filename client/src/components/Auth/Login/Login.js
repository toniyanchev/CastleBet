import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import postFetch from "../../../fetches/postFetch";
import { UserContext } from "../../../contexts/User/UserContext";

import Logo from "../../UI/Logo/Logo";

import { hidePassIcon, showPassIcon } from "../images";

import "./Login.css";
import { toast } from "react-toastify";
import TwoFactorModal from "./TwoFactorModal/TwoFactorModal";

const LOGIN = `${process.env.REACT_APP_API}/users/login`;

const Login = (props) => {
  const { handleRegisterNow } = props;
  let history = useHistory();

  const userData = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const login = () => {
    let user = {
      username: username,
      password: password,
    };

    postFetch(LOGIN, user).then((data) => {
      if (data.httpStatus === 200) {
        userData.setToken(data.token);
        userData.setUser({
          id: data.id,
          username: data.username,
          balance: data.balance,
          userType: data.userType,
        });
        setShowModal(true);
      } else {
        toast.error("Wrong credentials!");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {showModal ? (
        <TwoFactorModal
          username={username}
          password={password}
          handleClose={() => setShowModal(false)}
        />
      ) : null}
      <div className="LoginWrapper">
        <div className="LoginHeader">
          <Logo pxWidth={100} pxHeight={100} clickHandler={() => null} />
        </div>
        <div className="LoginFields">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="LoginPasswordField">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              className="ShowHidePassIcon"
              src={showPassword ? showPassIcon : hidePassIcon}
              alt="showPasswordImgErr"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        <div className="LoginButtons">
          <button className="LoginButton" onClick={() => login()}>
            LOGIN
          </button>
          <div className="LoginFooter">
            <div>Not registered yet?</div>
            <div className="RegisterNow" onClick={() => handleRegisterNow()}>
              Register now!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
