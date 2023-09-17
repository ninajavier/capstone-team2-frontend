import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase'; 
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
// import '@material/react-material-icon/dist/material-icon.css'; 

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

          if (data.status === 200) {
            setUserData(data.data);
          } else {
            console.error('Error fetching user data:', data.error);
          }

          const commentsResponse = await fetch(`/api/comments?userId=${user.uid}`);
          const commentsData = await commentsResponse.json();
          if (commentsData.status === 200) {
            setUserComments(commentsData.data);
          } else {
            console.error('Error fetching user comments:', commentsData.error);
          }

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
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, paddingRight: '20px' }}>
          <span className="material-icons" style={{ fontSize: '150px', borderRadius: '75px', color: '#bdbdbd' }}>
            account_circle
          </span>
        </div>
        
        <div style={{ flex: 3 }}>
          <Form>
            <Form.Group controlId="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                value={userData.bio || ''}
                onChange={(e) => setUserData(prevState => ({ ...prevState, bio: e.target.value }))}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdateProfile}>
              Update Profile
            </Button>
          </Form>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Your Comments:</h3>
        {isLoading ? <div>Loading comments...</div> : 
        userComments.length > 0 ? 
        <ul>
          {userComments.map((comment, index) => (
            <li key={index}>{comment.content}</li> 
          ))}
        </ul> : <p>No comments found</p>}
        
        <h3>Your Threads:</h3>
        {isLoading ? <div>Loading threads...</div> : 
        userThreads.length > 0 ? 
        <ul>
          {userThreads.map((thread, index) => (
            <li key={index}>{thread.title}</li> 
          ))}
        </ul> : <p>No threads found</p>}
      </div>

      <Button variant="link">
        <Link to="/update-profile">Go to update profile page</Link>
      </Button>
    </div>
  );
}

export default UserProfile;
