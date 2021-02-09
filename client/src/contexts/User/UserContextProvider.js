import React, { useState } from 'react'
import { UserContext } from './UserContext';

export const UserContextProvider = props => {
  const [user, setUser] = useState({
    id: null,
    username: null,
    userType: "user"
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>
  );
};
