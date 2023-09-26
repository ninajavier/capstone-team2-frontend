import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { ChatBubbleOutline } from '@mui/icons-material';
import axios from 'axios';

const CommentList = ({ comments }) => {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');

  const handleEditClick = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setNewCommentText(commentText);
  };

  const handleEditSave = async (commentId) => {
    try {
      // Make a PUT request to update the comment
      await axios.put(`/api/comments/${commentId}`, { content: newCommentText });
      // Clear edit mode
      setEditingCommentId(null);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteClick = async (commentId) => {
    try {
      // Make a DELETE request to delete the comment
      await axios.delete(`/api/comments/${commentId}`);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      {comments ? (
        comments.map((comment) => (
          <Card key={comment.id} className="mb-3">
            <Card.Body>
              <div>
                <ChatBubbleOutline />
                {editingCommentId === comment.id ? (
                  // Edit mode for the comment
                  <div>
                    <textarea
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                    />
                    <Button
                      variant="primary"
                      onClick={() => handleEditSave(comment.id)}
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  // Display mode for the comment
                  <div>{comment.content}</div>
                )}
              </div>
              <div>
                <strong>Posted by:</strong> {comment.user_username}
              </div>
              <div>
                <strong>Posted at:</strong> {comment.created_at}
              </div>
              <div>
                {editingCommentId === comment.id ? (
                  // Edit mode - no delete button
                  null
                ) : (
                  // Display mode - show delete button
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(comment.id)}
                  >
                    Delete
                  </Button>
                )}
                {/* Edit button */}
                <Button
                  variant="warning"
                  onClick={() =>
                    handleEditClick(comment.id, comment.content)
                  }
                >
                  Edit
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No comments available yet</p>
      )}
    </div>
  );
};

export default CommentList;
