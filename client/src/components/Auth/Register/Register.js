import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import postFetch from "../../../fetches/postFetch";

import UserType from "./UserType/UserType";
import RegisterHeader from "./RegisterHeader/RegisterHeader";
import ClientRegister from "./ClientRegister/ClientRegister";
import AdminRegister from "./AdminRegister/AdminRegister";

import "./Register.css";

const REGISTER_USER = `${process.env.REACT_APP_API}/users/register`;

const Register = () => {
  const [userType, setUserType] = useState("client");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [paypalId, setPaypalId] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [adminCode, setAdminCode] = useState("");

  let history = useHistory();

  const register = () => {
    const user = {
      username: username,
      email: email,
      password: password,
      payPalId: paypalId,
      isAdmin: userType === "admin" ? true : false,
      adminCode: adminCode,
      birthdate: birthDate,
    };
    postFetch(REGISTER_USER, user).then((data) => {
      if (data.httpStatus === 200) {
        history.push("/login");
        toast.success("Successful registration!");
      } else {
        toast.error("Invalid data!");
      }
    });
  };

  const changeUserType = (type) => {
    setUserType(type);
    setUsername(null);
    setEmail(null);
    setPassword(null);
    setPaypalId(null);
    setBirthDate(new Date());
    setAdminCode(null);
  };

  return (
    <div className="RegisterWrapper">
      <UserType
        userType={userType}
        handleChange={(type) => changeUserType(type)}
      />
      <RegisterHeader />
      {userType === "client" ? (
        <ClientRegister
          handlePassword={(pass) => setPassword(pass)}
          handleEmail={(mail) => setEmail(mail)}
          handleUsername={(usr) => setUsername(usr)}
          handlePaypalId={(id) => setPaypalId(id)}
          handleBirthDate={(date) => setBirthDate(date)}
        />
      ) : (
        <AdminRegister
          handlePassword={(pass) => setPassword(pass)}
          handleEmail={(mail) => setEmail(mail)}
          handleUsername={(usr) => setUsername(usr)}
          handleAdminCode={(code) => setAdminCode(code)}
        />
      )}
      <button className="RegisterButton" onClick={() => register()}>
        REGISTER NOW
      </button>
    </div>
  );
};

export default Register;
