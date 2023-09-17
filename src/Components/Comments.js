import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchCommentsAndThreads = async () => {
      try {
        // Adjust the URL to point to your backend endpoint for fetching comments
        const response = await axios.get('/api/comments');
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchCommentsAndThreads();
  }, []);

  return (
    <div>
      <h3>Let's Display Progrades Below!</h3>
      {comments.map((comment, index) => (
        <div key={index}>
          <h2>{comment.text}</h2>
          {comment.threads.map((thread, tIndex) => (
            <p key={tIndex}>{thread.title}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Comments;
