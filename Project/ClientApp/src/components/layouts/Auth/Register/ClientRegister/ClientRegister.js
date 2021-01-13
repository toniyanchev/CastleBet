import React, { useState, useEffect } from 'react';

import {hidePassIcon, showPassIcon} from '../../images';
import {validUsername, validPassword, validBirthDate} from '../validation';

import './ClientRegister.css';

const ClientRegister = props => {
  const { handlePassword, handleUsername, handleBirthDate } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [usernameClass, setUsernameClass] = useState("InvalidUsername");
  const [passwordClass, setPasswordClass] = useState("InvalidPassword");

  useEffect(() => {

  }, [])

  
  const changeUsername = value => {
    setUsername(value);
    if (validUsername(value) === true) {
      handleUsername(value);
      setUsernameClass("ValidUsername");
      setUsernameError("");
    } else {
      setUsernameError(validUsername(value));
      setUsernameClass("InvalidUsername");
      handleUsername("");
    }
  }
  const changePassword = value => {
    setPassword(value);
    if (validPassword(value) === true) {
      handlePassword(value);
      setPasswordClass("ValidPassword");
      setPasswordError("");
    } else {
      setPasswordError(validPassword(value));
      setPasswordClass("InvalidUsername");
      handlePassword("");
    }
  }
  const changeBirthDate = value => {
    console.log(value);
    setBirthDate(value);
    console.log(validBirthDate(value));
    if (validBirthDate(value) >= 18) {
      handleBirthDate(value);
    } else {
      handleBirthDate("");
    }
  }

  return (
    <div className="ClientRegisterWrapper">
      <input
        className={usernameClass}
        placeholder="Username"
        value={username}
        onChange={(e) => changeUsername(e.target.value)} />
      <div className="UsernameError">{usernameError}</div>

      <div className="PasswordField">
        <input
          className={passwordClass}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => changePassword(e.target.value)} />
        <img 
          className="ShowHidePassIcon"
          src={showPassword ? showPassIcon : hidePassIcon}
          alt="showPasswordImgErr"
          onClick={() => setShowPassword(!showPassword)} />
      </div>
      <div className="PasswordError">{passwordError}</div>

      <div className="BirthDateLabel">Date of your birth</div>
      <input 
          className="ClientRegisterBirthDate"
          type="date"
          placeholder="Date of birth"
          value={birthDate}
          onChange={(e) => changeBirthDate(e.target.value)} />
    </div>
  );
}

export default ClientRegister;