import React, { useState } from "react";
import AuthModal from "../Components/AuthModal";

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Welcome to Prograde</h1>
      <button onClick={openModal}>Open Modal</button>
      <AuthModal show={showModal} onClose={closeModal} />
    </div>
  );
};

export default LandingPage;
