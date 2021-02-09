import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import './Navigation.css';
import { UserContext } from '../../../contexts/User/UserContext';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';

const Navigation = () => {

  const userData = useContext(UserContext);

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
        userType={userData.user.userType}
        balance
      />

    </div>
  )
}

export default Navigation;