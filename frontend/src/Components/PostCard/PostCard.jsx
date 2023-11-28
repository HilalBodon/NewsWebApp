import React from 'react';
import './PostCard.css';

const PostCard = ({ title, content, author, createdAt }) => {
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="post-card">
      <div className="post-header">
        <h2 className="post-title">{title}</h2>
        <p className="post-meta">{`By ${author} on ${formattedDate}`}</p>
      </div>
      <p className="post-content">{content}</p>
    </div>
  );
};

export default PostCard;

// import React from 'react';
// import { Card, CardContent, Typography } from '@mui/material';

// const PostCard = ({ title, content, author }) => {
//   return (
//     <Card>
//       <CardContent>
//         <Typography variant="h5" component="div">
//           {title}
//         </Typography>
//         <Typography color="text.secondary">{author}</Typography>
//         <Typography variant="body2" component="div">
//           {content}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default PostCard;
