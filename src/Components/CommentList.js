import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Grid,
  TextareaAutosize,
  IconButton,
} from "@mui/material";
import { Delete, Edit, AccessTime } from "@mui/icons-material";
import axios from "axios";

const CommentList = ({ threadId }) => {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getComments = async () => {
      const commentsResponse = await axios.get(
        `${API}/api/threads/${threadId}/comments`
      );
      const comments = commentsResponse.data.data;

      const sortedComments = comments.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setComments(sortedComments);
    };
    getComments();
  }, [API, threadId]);

  const handleEditClick = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setNewCommentText(commentText);
  };
  const handleEditSave = async (commentId) => {
    try {
      const response = await axios.put(`/api/comments/${commentId}`, {
        content: newCommentText,
      });
      console.log("Comment update response:", response.data); // Log the response

      // Update the local state to reflect the changes
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            content: newCommentText,
          };
        }
        return comment;
      });
      setComments(updatedComments);

      // Clear edit mode
      setEditingCommentId(null);
    } catch (error) {
      console.error("Error updating comment:", error.response); // Log the error response
    }
  };

  const handleDeleteClick = async (commentId) => {
    try {
      const response = await axios.delete(`/api/comments/${commentId}`);
      console.log("Comment delete response:", response.data); // Log the response
      // Remove the deleted comment from the comments array
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error.response); // Log the error response
    }
  };

  return (
    <div>
      {comments ? (
        comments.map((comment) => (
          <Card key={comment.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container alignItems="center">
                    <Grid item xs={1}>
                      <Avatar
                        src={`https://source.unsplash.com/random/50x50/?portrait&${Math.random()}`}
                        alt="avatar"
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                        }}
                      />
                    </Grid>
                    <Grid item xs={10}>
                      {editingCommentId === comment.id ? (
                        // Edit mode for the comment
                        <div>
                          <TextareaAutosize
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            minRows={3}
                            style={{ width: "100%" }}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEditSave(comment.id)}
                            sx={{ marginTop: 1 }}
                          >
                            Save
                          </Button>
                        </div>
                      ) : (
                        // Display mode for the comment
                        <Typography variant="body1">
                          {comment.content}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        color="warning"
                        onClick={() =>
                          handleEditClick(comment.id, comment.content)
                        }
                      >
                        <Edit />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Posted Anonymously</strong>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">
                    <AccessTime />
                    {comment.created_at}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {editingCommentId === comment.id ? null : (
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(comment.id)}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1">No comments available yet</Typography>
      )}
    </div>
  );
};

export default CommentList;
