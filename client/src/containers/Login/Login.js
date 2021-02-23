import React from 'react';
import { useHistory } from 'react-router-dom';

import Login from '../../components/Auth/Login/Login';

const LoginContainer = () => {
  let history = useHistory();
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%"
    }}>
      <Login handleRegisterNow={() => history.push("/register")} />
    </div>
  )
}

export default LoginContainer;