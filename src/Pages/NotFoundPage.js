import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom'; // You may need to adjust the import for routing

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <Typography variant="h1" color="primary" style={{ fontWeight: 'bold' }}>
        Sorry, we couldn't find that page
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
