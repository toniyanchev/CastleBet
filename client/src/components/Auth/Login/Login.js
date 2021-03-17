import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import postFetch from "../../../fetches/postFetch";
import { UserContext } from "../../../contexts/User/UserContext";

import Logo from "../../UI/Logo/Logo";

import { hidePassIcon, showPassIcon } from "../images";

import "./Login.css";
import { toast } from "react-toastify";

const AUTHENTICATE_USER = `${process.env.REACT_APP_API}/users/authenticate`;

const Login = (props) => {
  const { handleRegisterNow } = props;
  let history = useHistory();

  const userData = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = () => {
    let user = {
      username: username,
      password: password,
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
      } else {
        toast.error("Wrong credentials!");
      }
    });
  };

  return (
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
  );
};

export default Login;
