import React, { useState } from 'react';

import UserType from './UserType/UserType';
import ClientRegister from './ClientRegister/ClientRegister';
import AdminRegister from './AdminRegister/AdminRegister';

import './Register.css';

const Register = () => {
  const [userType, setUserType] = useState("client");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [error, setError] = useState("");

  const register = () => {
    console.log(username);
    console.log(password);
    console.log(birthDate);
    console.log(error);
  }

  const changeUserType = type => {
    setUserType(type);
    setUsername("");
    setPassword("");
    setBirthDate(new Date());
  }

  return (
    <div className="RegisterWrapper">
      <UserType 
        userType={userType}
        handleChange={(type) => changeUserType(type)}
      />
      {
        userType === "client" ?
          <ClientRegister
            handlePassword={(pass) => setPassword(pass)}
            handleUsername={(usr) => setUsername(usr)}
            handleBirthDate={(date) => setBirthDate(date)}
            handleError={(err) => setError(err)} /> :
          <AdminRegister />
      }
      <button 
        className="RegisterButton"
        onClick={() => register()} >REGISTER NOW</button>
    </div>
  );
}

export default Register;