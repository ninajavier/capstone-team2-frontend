import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase'; 
import { Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

const UpdateProfile = () => {
  const [userData, setUserData] = useState(auth.currentUser || {});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserDataFromBackend() {
      try {
        const url = '/path/to/your/api/endpoint';  // Replace with your actual API endpoint
        const response = await fetch(url);
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err);
        setLoading(false);
      }
    }
    
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
          navigate('/profile');
        } else {
          console.error('Error updating profile:', await response.text());
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  }

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="UpdateProfile">
      <h1>Update Profile</h1>
      {error && <p className="text-danger">Error loading data. Please try again later.</p>}
      <Form>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
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

        <Form.Group controlId="profilePhoto">
          <Form.Label>Profile Photo URL</Form.Label>
          <Form.Control
            type="url"
            value={userData.profilePhoto || ''}
            onChange={(e) => setUserData(prevState => ({ ...prevState, profilePhoto: e.target.value }))}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleUpdateProfile}>
          Save Changes
        </Button>
      </Form>
    </div>
  );
}

export default UpdateProfile;
