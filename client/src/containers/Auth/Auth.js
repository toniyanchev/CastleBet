import React, { useState } from 'react';

import Login from '../../components/Auth/Login/Login';
import Register from '../../components/Auth/Register/Register';

import './Auth.css';

const Auth = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="AuthContainer">

      {
        showRegister ?
          <Register /> :
          <Login
            handleRegisterNow={() => setShowRegister(true)} />
      }
      
    </div>
  );
}

export default Auth;