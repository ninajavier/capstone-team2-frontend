import React, { useState } from 'react';
import { Modal, Button, Rating, TextareaAutosize, Box, Typography } from '@mui/material';

const RatingModal = ({ show, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // Perform any action you want with the rating and comment
    // For example, send the data to your backend for storage

    // Close the modal after submission
    onClose();

    // Set the submitted state to true
    setSubmitted(true);
  };

  return (
    <Modal open={show} onClose={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          p: 4,
          borderRadius: 8,
          maxWidth: 400,
          textAlign: 'center',
        }}
      >
        {submitted ? (
          <div>
            <Typography variant="h6">Enjoy Your Commute -- Stand Clear of the Closing Doors!</Typography>
            <Typography variant="body1">Your feedback is greatly appreciated.</Typography>
          </div>
        ) : (
          <>
            <h2>Rate Prograde</h2>
            <div>
              <p>How's our app so far?</p>
              <Rating
                name="rating"
                value={rating}
                precision={0.5}
                onChange={handleRatingChange}
              />
            </div>
            <div>
              <p>If you like it, leave a comment:</p>
              <TextareaAutosize
                aria-label="Comment"
                rowsMin={3}
                placeholder="Share your feedback..."
                value={comment}
                onChange={handleCommentChange}
              />
            </div>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default RatingModal;
