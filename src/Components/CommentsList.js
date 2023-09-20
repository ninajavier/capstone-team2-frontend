import React from 'react';
import Comment from './Comment';

const CommentsList = ({ comments, onDelete, onUpdate }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default CommentsList;
