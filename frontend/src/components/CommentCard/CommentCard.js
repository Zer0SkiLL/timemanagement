import React, { useState  } from 'react';
import { Card, CardHeader, CardContent, Divider, Typography, TextField, Button, Box } from '@mui/material';

const CommentsCard = () => {
  const [comments, setComments] = useState([
    { id: 1, date: '2023-05-15', time: '10:30', comment: 'Lorem ipsum dolor sit amet.' },
    { id: 2, date: '2023-05-14', time: '15:45', comment: 'Consectetur adipiscing elit.' },
    // Add more mock comments as needed
  ]);

  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== '') {
      const currentDate = new Date().toISOString().split('T')[0];
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false});

      const newCommentObj = {
        id: comments.length + 1,
        date: currentDate,
        time: currentTime,
        comment: newComment,
      };

      setComments([...comments, newCommentObj]);
      setNewComment('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCommentSubmit();
    }
  };

  return (
    <Card>
        <CardHeader
            title="Comments"
        />
        <Divider sx={{ my: 1 }} />
      <CardContent>
        {comments.map((comment) => (
          <div key={comment.id}>
            <Typography variant="body2" color="textSecondary">
              {comment.date} {comment.time}
            </Typography>
            <Typography variant="body1">{comment.comment}</Typography>
          </div>
        ))}
        <Box display="flex" alignItems="center" mt={2}>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={newComment}
            onChange={handleCommentChange}
            onKeyDown={handleKeyDown}
            placeholder="Add a comment..."
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
            Submit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CommentsCard;
