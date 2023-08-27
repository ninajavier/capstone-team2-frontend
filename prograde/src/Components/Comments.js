import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchCommentsAndThreads = async () => {
      const commentsSnapshot = await getDocs(collection(db, 'comments'));
      const fetchedComments = [];

      for (let doc of commentsSnapshot.docs) {
        const commentData = doc.data();
        
        const threadsSnapshot = await getDocs(query(collection(db, 'threads'), where('commentId', '==', doc.id)));
        commentData.threads = threadsSnapshot.docs.map(threadDoc => threadDoc.data());
        
        fetchedComments.push(commentData);
      }

      setComments(fetchedComments);
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
}

export default Comments;
