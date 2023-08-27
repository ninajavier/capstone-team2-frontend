import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';

const ThreadList = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const threadsCollectionRef = collection(db, "threads");
        const data = await getDocs(threadsCollectionRef);
        const fetchedThreads = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setThreads(fetchedThreads);
      } catch (err) {
        console.error("Error fetching threads:", err);
      }
    };

    fetchThreads();
  }, []);

  return (
    <div>
      <h2>Threads</h2>
      {threads.map((thread) => (
        <div key={thread.id} style={{border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
          <h3>{thread.title}</h3>
          <p>{thread.content}</p>
          <p><strong>Train:</strong> {thread.train}</p>
          <p><strong>Station:</strong> {thread.station}</p>
          {/* Add more fields or design as required */}
        </div>
      ))}
    </div>
  )
}

export default ThreadList;
