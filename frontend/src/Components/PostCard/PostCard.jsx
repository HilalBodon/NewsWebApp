import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const PostCard = ({ title, content, author }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography color="text.secondary">{author}</Typography>
        <Typography variant="body2" component="div">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
