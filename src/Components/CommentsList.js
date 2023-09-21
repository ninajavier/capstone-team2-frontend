import React from 'react';
import Comment from './Comment';
import { Container } from 'react-bootstrap';
import { styled } from '@mui/system';

const CommentContainer = styled(Container)(({ theme }) => ({
  padding: '1rem',
  background: 'rgba(255, 255, 255, 0.8)', // Slight opacity applied here
}));

const CommentsList = ({ comments, onDelete, onUpdate }) => {
  return (
    <CommentContainer>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </CommentContainer>
  );
};

export default CommentsList;
