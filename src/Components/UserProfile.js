// src/components/UserProfile.js//
//
import React, { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import EditIcon from "@mui/icons-material/Edit";

const UserProfile = () => {
  const user = useContext(UserContext);
  const [bio, setBio] = useState(user ? user.bio : "");
  const [isEditing, setIsEditing] = useState(false);

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const avatarURL =
    user && user.photoURL ? user.photoURL : "https://via.placeholder.com/150";

  if (!user) {
    return null; // or return a loading spinner, or some other placeholder
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              avatar={<Avatar src={avatarURL} />}
              title={user.displayName}
              subheader="User Bio"
              action={
                <Button onClick={toggleEditing} startIcon={<EditIcon />}>
                  {isEditing ? "Done" : "Edit"}
                </Button>
              }
            />
            {isEditing ? (
              <CardContent>
                <TextField
                  label="Why I use Prograde:"
                  value={bio}
                  onChange={handleBioChange}
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
              </CardContent>
            ) : (
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {bio || "No bio provided."}
                </Typography>
              </CardContent>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <List>
            <ListItem>
              <ListItemIcon>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText primary="My Threads" />
            </ListItem>
            <Divider />
            {/* ... other list items for user activities ... */}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
