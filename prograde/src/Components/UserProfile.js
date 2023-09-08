import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase'; 
import { Button, Form } from 'react-bootstrap';

const UserProfile = () => {
  const [userData, setUserData] = useState(auth.currentUser || {}); // initialize with auth.currentUser
  const [userComments, setUserComments] = useState([]);
  const [userThreads, setUserThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDataFromBackend = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          // Fetch user comments and threads from your backend API
          const response = await fetch(`/api/users/${user.uid}`);
          const data = await response.json();

          setUserComments(data.userComments);
          setUserThreads(data.userThreads);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching user data from backend:", error);
        }
      }
    };

    fetchUserDataFromBackend();
  }, []);

  const handleUpdateProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        // Update user profile in your backend API
        const response = await fetch(`/api/users/${user.uid}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
        
        if (response.ok) {
          alert('Profile updated successfully!');
        } else {
          console.error('Error updating profile:', await response.text());
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  }

  return (
    <div className="UserProfile">
      <h1>Your Profile</h1>
      <img src={userData.profilePhoto} alt="Profile" />

      <Form>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={userData.username || ''}
            onChange={(e) => setUserData(prevState => ({ ...prevState, username: e.target.value }))}
          />
        </Form.Group>

        {/* Add more fields as necessary, like email, etc. */}

        <Button variant="primary" onClick={handleUpdateProfile}>
          Update Profile
        </Button>
      </Form>

      {isLoading ? (
        <div>Loading comments and threads...</div>
      ) : (
        <>
          <h3>Your Comments:</h3>
          <ul>
            {userComments.map((comment, index) => (
              <li key={index}>{comment.text}</li>
            ))}
          </ul>

          <h3>Your Threads:</h3>
          <ul>
            {userThreads.map((thread, index) => (
              <li key={index}>{thread.title}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default UserProfile;
