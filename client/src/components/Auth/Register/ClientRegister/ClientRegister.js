import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

import { hidePassIcon, showPassIcon } from "../../images";
import { validUsername, validPassword, validBirthDate } from "../validation";

import "./ClientRegister.css";

const ClientRegister = (props) => {
  const {
    handlePassword,
    handleEmail,
    handleUsername,
    handlePaypalId,
    handleBirthDate,
  } = props;

  const springProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [paypalId, setPaypalId] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [usernameClass, setUsernameClass] = useState("InvalidUsername");
  const [passwordClass, setPasswordClass] = useState("InvalidPassword");

  const changeUsername = (value) => {
    setUsername(value);
    if (validUsername(value) === true) {
      setUsernameClass("ValidUsername");
      setUsernameError("");
    } else {
      setUsernameError(validUsername(value));
      if (value === "") {
        setUsernameError("");
      }
      setUsernameClass("InvalidUsername");
    }
    handleUsername(value);
  };
  const changeEmail = (value) => {
    setEmail(value);
    handleEmail(value);
  };
  const changePassword = (value) => {
    setPassword(value);
    if (validPassword(value) === true) {
      setPasswordClass("ValidPassword");
      setPasswordError("");
    } else {
      setPasswordError(validPassword(value));
      setPasswordClass("InvalidUsername");
    }
    handlePassword(value);
  };
  const changePaypalId = (value) => {
    setPaypalId(value);
    handlePaypalId(value);
  };
  const changeBirthDate = (value) => {
    setBirthDate(value);
    if (validBirthDate(value) >= 18) {
      handleBirthDate(new Date(value));
    } else {
      handleBirthDate(new Date());
    }
  };

  return (
    <animated.div style={springProps}>
      <div className="ClientRegisterWrapper">
        <input
          className={usernameClass}
          placeholder="Username"
          value={username}
          onChange={(e) => changeUsername(e.target.value)}
        />
        <div className="UsernameError">{usernameError}</div>

        <input
          // className="EmailField"
          placeholder="Email"
          value={email}
          onChange={(e) => changeEmail(e.target.value)}
        />

        <div className="ClientPasswordField">
          <input
            className={passwordClass}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => changePassword(e.target.value)}
          />
          <img
            className="ShowHidePassIcon"
            src={showPassword ? showPassIcon : hidePassIcon}
            alt="showPasswordImgErr"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <div className="PasswordError">{passwordError}</div>

        <input
          className="PayPalId"
          placeholder="PayPal_Id"
          value={paypalId}
          onChange={(e) => changePaypalId(e.target.value)}
        />

        <div className="BirthDateLabel">Date of your birth</div>
        <input
          className="ClientRegisterBirthDate"
          type="date"
          placeholder="Date of birth"
          value={birthDate}
          onChange={(e) => changeBirthDate(e.target.value)}
        />
      </div>
    </animated.div>
  );
};

export default ClientRegister;
