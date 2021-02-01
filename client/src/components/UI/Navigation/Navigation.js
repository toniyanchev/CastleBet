import React from 'react'
import { useHistory } from 'react-router-dom';

import './Navigation.css';

import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';

const Navigation = props => {
  const { userType } = props;

  const history = useHistory();
  
  return (
    <div className="NavBar">
      <div className="NavBarLogo">
        <Logo 
          pxWidth={60}
          pxHeight={60}
          clickHandler={() => history.push("/")}
        />
      </div>

      <NavigationItems 
        userType={userType}
        username
        balance
      />

    </div>
  )
}

export default Navigation;