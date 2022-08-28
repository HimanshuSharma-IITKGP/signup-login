import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Profile = () => {
  const userInfo = useSelector((state) => state.user);

  return (
    <div>
      <h1>Hello {userInfo.name}</h1>
      <p>your email id is: {userInfo.email}</p>
    </div>
  );
};

export default Profile;
