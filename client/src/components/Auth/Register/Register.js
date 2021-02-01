import React, { useState } from 'react';

import postFetch from '../../../postFetch';
import validateUserData from './validation';

import UserType from './UserType/UserType';
import RegisterHeader from './RegisterHeader/RegisterHeader';
import ClientRegister from './ClientRegister/ClientRegister';
import AdminRegister from './AdminRegister/AdminRegister';

import './Register.css';

const REGISTER_USER = `http://localhost:4000/users/register`;

const Register = () => {
  const [userType, setUserType] = useState("client");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [adminCode, setAdminCode] = useState("")

  const register = () => {
    const user = {
      username: username,
      password: password,
      isAdmin: userType === "admin" ? true : false,
      adminCode: adminCode,
      birthdate: birthDate
    }
    if (validateUserData(user) === false) {
      window.alert('Not valid user data!'); //Aler if there is invalid data.
    } else {
      postFetch(REGISTER_USER, user); //Register user if user data is valid.
    }
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
            handlePassword={(pass) => {
              setPassword(pass)
              console.log(pass);
            }}
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