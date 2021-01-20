import React, { useState } from 'react';

import UserType from './UserType/UserType';
import RegisterHeader from './RegisterHeader/RegisterHeader';
import ClientRegister from './ClientRegister/ClientRegister';
import AdminRegister from './AdminRegister/AdminRegister';

import './Register.css';

const Register = () => {
  const [userType, setUserType] = useState("client");
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [birthDate, setBirthDate] = useState(new Date());
  const [adminCode, setAdminCode] = useState(null)

  const register = () => {
    console.log(username);
    console.log(password);
    console.log(birthDate);
    console.log(adminCode);
  }

  const changeUserType = type => {
    setUserType(type);
    setUsername(null);
    setPassword(null);
    setBirthDate(new Date());
    setAdminCode(null);
  }

  return (
    <div className="RegisterWrapper">
      <UserType 
        userType={userType}
        handleChange={(type) => changeUserType(type)}
      />
      <RegisterHeader />
      {
        userType === "client" ?
          <ClientRegister
            handlePassword={(pass) => setPassword(pass)}
            handleUsername={(usr) => setUsername(usr)}
            handleBirthDate={(date) => setBirthDate(date)} /> :
          <AdminRegister
            handlePassword={(pass) => setPassword(pass)}
            handleUsername={(usr) => setUsername(usr)}
            handleAdminCode={(code) => setAdminCode(code)} />
      }
      <button 
        className="RegisterButton"
        onClick={() => register()} >REGISTER NOW</button>
    </div>
  );
}

export default Register;