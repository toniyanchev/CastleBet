import React from 'react';

import './UserType.css';

const UserType = props => {
  const { userType, handleChange } = props
  return (
    <div className="RegisterTypeSwitch">
      <div
        className={userType === "client" ?
        "RegisterTypeSelected" :
        "RegisterType"}
        onClick={() => handleChange("client")} >Client</div>
      <div
        className={userType === "admin" ?
        "RegisterTypeSelected" :
        "RegisterType"}
        onClick={() => handleChange("admin")} >Admin</div>
    </div>
  );
}

export default UserType;