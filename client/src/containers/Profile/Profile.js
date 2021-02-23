import React from 'react'
import ProfileEdit from '../../components/Profile/ProfileEdit';

const ProfileContainer = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    }}>
      <ProfileEdit />
    </div>
  );
}

export default ProfileContainer;