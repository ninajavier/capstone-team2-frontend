import React, { useState, useEffect } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('fetchPostsData')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>Train Line: {post.train_line}</p>
            <p>Station: {post.station}</p>
            <p>Rating: {post.rating}</p>
            <p>Photo URL: {post.photo_url}</p>
            <p>Favorite: {post.is_favorite ? 'Yes' : 'No'}</p>
            <p>Tags: {post.tags.join(', ')}</p>
            <p>Created At: {new Date(post.created_at).toLocaleString()}</p>
            <p>Updated At: {new Date(post.updated_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
