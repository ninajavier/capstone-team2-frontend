import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase'; 
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

const ThreadDetail = (props) => {
  const [thread, setThread] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const threadId = props.match.params.id;  // Assuming you're using react-router

  useEffect(() => {
    const fetchThreadDetail = async () => {
      try {
        // Fetch thread details
        const threadRef = doc(db, 'threads', threadId);
        const threadDoc = await getDoc(threadRef);
        if (threadDoc.exists) {
          setThread(threadDoc.data());
        }

        // Fetch comments for the thread
        const commentsRef = collection(db, "comments");
        const commentsQuery = query(commentsRef, where("threadId", "==", threadId));
        const commentsSnapshot = await getDocs(commentsQuery);
        setComments(commentsSnapshot.docs.map(doc => doc.data()));

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching thread details:", error);
      }
    };

    fetchThreadDetail();
  }, [threadId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ThreadDetail">
      <h2>{thread.title}</h2>
      <p>{thread.description}</p>
      <h3>Comments:</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ThreadDetail;
