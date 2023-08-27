import React from 'react';
import UserProfile from './UserProfile'; // Ensure the path is correct

const Profile = () => {
  return (
    <div className="Profile">
      <h1>Welcome to Prograde Profile Page!</h1>
      <UserProfile />
      {/* You can add other components or elements here if needed */}
    </div>
  );
}

export default Profile;
