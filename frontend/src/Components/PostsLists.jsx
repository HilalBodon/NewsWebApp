import React from 'react';
import PostCard from './PostCard/PostCard';

const PostList = ({ posts }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {posts.map((post) => (
        <PostCard key={post._id} title={post.title} content={post.content} category={post.category} createdAt={post.createdAt} imgUrl={post.imgUrl}/>
      ))}
    </div>
    
  );
};

export default PostList;
