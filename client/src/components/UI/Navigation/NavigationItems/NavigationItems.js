import React from 'react'
import { useHistory } from 'react-router-dom';

import NavigationItem from './NavigationItem/NavigationItem';

import './NavigationItems.css';

const NavigationItems = props => {
  const { userType, username, balance } = props;

  const history = useHistory();

  const userItems = (
    <ul className="NavigationItemsInnerWrapper">
      <NavigationItem 
        name="Slot Machine"
        handleClick={() => history.push("/slot")}
      />
      <NavigationItem 
        name="Login"
        handleClick={() => history.push("/auth")}
      />
    </ul>
  );

  const adminItems = (
    <ul className="NavigationItemsInnerWrapper">
      <NavigationItem 
        name="Slot Machine"
        handleClick={() => history.push("/slot")}
      />
      <NavigationItem 
        name="Tickets"
        handleClick={() => history.push("/tickets")}
      />
      <NavigationItem 
        name={username}
        handleClick={() => history.push("/")}
      />
    </ul>
  )

  const clientItems = (
    <ul className="NavigationItemsInnerWrapper">
      <NavigationItem 
        name="Slot Machine"
        handleClick={() => history.push("/slot")}
      />

      <NavigationItem 
        name="Tickets"
        handleClick={() => history.push("/tickets")}
      />
      <NavigationItem 
        name={username}
        handleClick={() => history.push("/")}
      />
      <NavigationItem 
        name={balance}
        handleClick={() => history.push("/")}
      />
    </ul>
  );
  return (
    <div className="NavigationItemsWrapper">
      {
        userType === "user" ?
          userItems :
          null
      }
      {
        userType === "admin" ?
          adminItems :
          null
      }
      {
        userType === "client" ?
          clientItems :
          null
      }
    </div>
  );
}

export default NavigationItems;