import React from 'react';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AboutPage from '../Components/AboutPage'; // Import the AboutPage component


const Home = () => {
  return (
 <div>
  <h1>Welcome To Prograde!</h1>
      <AboutPage />

    </div>
  )
}

export default Home;
