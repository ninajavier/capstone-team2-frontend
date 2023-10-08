import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import notFoundImage from "../Assets/404.png"; // Adjust the path to your image file

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <img
        src={notFoundImage}
        alt="Not Found"
        style={{ width: '400px', height: 'auto', marginBottom: '20px' }}
      />
      <Typography variant="h1" color="primary" style={{ fontWeight: 'bold' }}>
        <h1>Sorry, we couldn't find that page</h1>
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ margin: '20px' }}
        component={Link}
        to="/home"
      >
        Go to Home
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ margin: '20px' }}
        onClick={() => window.history.back()}
      >
        <ArrowBackIcon /> Go Back
      </Button>
    </div>
  );
};

export default NotFoundPage;
