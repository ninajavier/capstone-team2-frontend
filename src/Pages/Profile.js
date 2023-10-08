// src/components/Profile.js

import React from 'react';
import UserProfile from './UserProfile';

const Profile = () => {
  return (
    <div className="Profile container mt-4">
      <h1 className="text-center mb-4">Welcome to the Profile Page!</h1>
      <UserProfile />
    </div>
  );
};

export default Profile;
