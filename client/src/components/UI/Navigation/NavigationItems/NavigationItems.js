import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';

import { UserContext } from '../../../../contexts/User/UserContext';

import NavigationItem from './NavigationItem/NavigationItem';

import './NavigationItems.css';

const NavigationItems = props => {
  const { userType } = props;

  const userData = useContext(UserContext);

  const history = useHistory();

  const userItems = (
    <ul className="NavigationItemsInnerWrapper">
      <NavigationItem 
        name="Login"
        handleClick={() => history.push("/login")}
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
        name={userData.user?.username}
        handleClick={() => history.push("/profile")}
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
        name={userData.user?.username}
        handleClick={() => history.push("/profile")}
      >
        <div>{userData.user?.balance} CC</div>
      </NavigationItem>
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