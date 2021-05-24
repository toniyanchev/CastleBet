import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

import { hidePassIcon, showPassIcon } from "../../images";
import { validUsername, validPassword } from "../validation";

import "./AdminRegister.css";

const AdminRegister = (props) => {
  const { handlePassword, handleEmail, handleUsername, handleAdminCode } =
    props;

  const springProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [adminCode, setAdminCode] = useState(null);

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
  const changeAdminCode = (value) => {
    setAdminCode(value);
    handleAdminCode(value);
  };

  return (
    <animated.div style={springProps}>
      <div className="AdminRegisterWrapper">
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

        <div className="AdminPasswordField" style={{ marginBottom: "15px" }}>
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
          placeholder="Admin code"
          value={adminCode}
          onChange={(e) => changeAdminCode(e.target.value)}
        />
      </div>
    </animated.div>
  );
};

export default AdminRegister;
