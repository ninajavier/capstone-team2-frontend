import React from 'react';
import { Card } from 'react-bootstrap'; // Import Card from 'react-bootstrap'
import { ChatBubbleOutline } from '@mui/icons-material';

const CommentList = ({ comments }) => {
    console.log(comments); // Log comments to the console
  return (
    <div>
      {comments ? (
        comments.map((comment, index) => (
          <Card key={index} className="mb-3">
            <Card.Body> {/* Use Card.Body here */}
              <div>
                <ChatBubbleOutline />
                {comment.content}
              </div>
              <div>
                <strong>Posted by:</strong> {comment.user_username} {/* Replace with the actual user property */}
              </div>
              <div>
                <strong>Posted at:</strong> {comment.created_at} {/* Replace with the actual timestamp property */}
              </div>
              {/* Add any other comment details you want to display */}
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
