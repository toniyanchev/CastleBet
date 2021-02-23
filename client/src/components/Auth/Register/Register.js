import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import postFetch from '../../../fetches/postFetch';

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
  const [adminCode, setAdminCode] = useState("");

  let history = useHistory();

  const register = () => {
    const user = {
      username: username,
      password: password,
      isAdmin: userType === "admin" ? true : false,
      adminCode: adminCode,
      birthdate: birthDate
    }
    postFetch(REGISTER_USER, user)
      .then(data => {
        if (data.httpStatus === 200) {
          history.push("/login");
        } else {
          toast.error("Invalid data!");
        }
      });
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