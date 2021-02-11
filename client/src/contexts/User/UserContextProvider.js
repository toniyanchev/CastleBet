import React, { useState } from 'react'
import { UserContext } from './UserContext';

export const UserContextProvider = props => {
  const [user, setUser] = useState({
    id: null,
    username: null,
    userType: "user"
  });
  const [token, setToken] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>{props.children}</UserContext.Provider>
  );
};
