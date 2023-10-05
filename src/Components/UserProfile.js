import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase'; 
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import { Card, Typography } from '@mui/material';
import { Button } from '@mui/material';
 // Importing MUI components
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
          if(!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          const text = await response.text();
          try {
            const data = JSON.parse(text);
            if (data.status === 200) {
              setUserData(data.data);
            } else {
              console.error('Error fetching user data:', data.error);
            }
          } catch (e) {
            console.error('Invalid JSON:', text);
          }
          
          // Reintroduce fetching comments and threads with enhanced error handling here
          
          const commentsResponse = await fetch(`/api/comments?userId=${user.uid}`);
          const commentsText = await commentsResponse.text();
          try {
            const commentsData = JSON.parse(commentsText);
            if (commentsData.status === 200) {
              setUserComments(commentsData.data);
            } else {
              console.error('Error fetching user comments:', commentsData.error);
            }
          } catch (e) {
            console.error('Invalid JSON:', commentsText);
          }
  
          const threadsResponse = await fetch(`/api/threads?userId=${user.uid}`);
          const threadsText = await threadsResponse.text();
          try {
            const threadsData = JSON.parse(threadsText);
            if (threadsData.status === 200) {
              setUserThreads(threadsData.data);
            } else {
              console.error('Error fetching user threads:', threadsData.error);
            }
          } catch (e) {
            console.error('Invalid JSON:', threadsText);
          }
  
          setIsLoading(false);
          
        } catch (error) {
          console.error('Fetch error:', error);
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
    <div className="UserProfile" style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <Card style={{ width: '80%', padding: '20px', boxShadow: '0 3px 10px rgba(0,0,0,0.2)' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Profile
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <span className="material-icons" style={{ fontSize: '150px', borderRadius: '75px', color: '#bdbdbd', marginRight: '20px' }}>
            account_circle
          </span>
          
          <Form style={{ flex: 1 }}>
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

        <Typography variant="h6" gutterBottom>
          Your Comments:
        </Typography>
        {isLoading ? <div>Loading comments...</div> : 
        userComments.length > 0 ? 
        <ul>
          {userComments.map((comment, index) => (
            <li key={index}>{comment.content}</li> 
          ))}
        </ul> : <Typography>No comments found</Typography>}
        
        <Typography variant="h6" gutterBottom>
          Your Threads:
        </Typography>
        {isLoading ? <div>Loading threads...</div> : 
        userThreads.length > 0 ? 
        <ul>
          {userThreads.map((thread, index) => (
            <li key={index}>{thread.title}</li> 
          ))}
        </ul> : <Typography>No threads found</Typography>}

        <Button variant="outline-primary">
          <Link to="/update-profile">Go to update profile page</Link>
        </Button>
      </Card>
    </div>
  );
}

export default UserProfile;