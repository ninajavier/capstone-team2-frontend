import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase'; 
import { Button, Form } from 'react-bootstrap';

const UserProfile = () => {
  const [userData, setUserData] = useState(auth.currentUser || {});
  const [userComments, setUserComments] = useState([]);
  const [userThreads, setUserThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDataFromBackend = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const response = await fetch(`/api/users/${user.uid}`);
          const data = await response.json();

          // Set user data
          if (data.status === 200) {
            setUserData(data.data); // Updating to data.data to correctly access the user data based on your backend structure
          } else {
            console.error('Error fetching user data:', data.error);
          }

          // Fetch user comments
          const commentsResponse = await fetch(`/api/comments?userId=${user.uid}`);
          const commentsData = await commentsResponse.json();
          if (commentsData.status === 200) {
            setUserComments(commentsData.data);
          } else {
            console.error('Error fetching user comments:', commentsData.error);
          }

          // Fetch user threads
          const threadsResponse = await fetch(`/api/threads?userId=${user.uid}`);
          const threadsData = await threadsResponse.json();
          if (threadsData.status === 200) {
            setUserThreads(threadsData.data);
          } else {
            console.error('Error fetching user threads:', threadsData.error);
          }

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
      <img src={userData.profilePhoto || 'defaultProfilePhotoURL'} alt="Profile" />

      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={userData.name || ''}
            onChange={(e) => setUserData(prevState => ({ ...prevState, name: e.target.value }))}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={userData.email || ''}
            onChange={(e) => setUserData(prevState => ({ ...prevState, email: e.target.value }))}
          />
        </Form.Group>

        {/* Add more fields as necessary, like profile photo URL, etc. */}

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
              <li key={index}>{comment.content}</li> 
            ))}
          </ul>

          <h3>Your Threads:</h3>
          <ul>
            {userThreads.map((thread, index) => (
              <li key={index}>{thread.content}</li> 
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default UserProfile;
