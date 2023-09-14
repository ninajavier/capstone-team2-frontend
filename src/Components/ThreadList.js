import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ThreadList = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        // Adjust the URL to point to your backend endpoint for fetching threads
        const response = await axios.get('/api/threads');
        setThreads(response.data);
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
