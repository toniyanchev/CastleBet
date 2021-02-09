import React, { Context } from 'react';

export const UserContext = React.createContext({
  user: null,
  setUser: () => {}
});
