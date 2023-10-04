import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Paper,
  ThemeProvider,
  createTheme,
  InputAdornment,
  Divider,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { GitHub, LinkedIn, Email } from "@mui/icons-material";

const theme = createTheme({
  typography: {
    fontFamily: "Raleway, sans-serif",
  },
});

const SignUp = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here

    // Assuming form submission is successful:
    setConfirmationDialogOpen(true); // Open the confirmation dialog
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
    handleCloseModal(); // Close the signup box
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Divider variant="center" sx={{ thickness: 3 }} />
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper elevation={8} sx={{ p: 3 }}>
            <Typography variant="body1" gutterBottom align="center">
              <span style={{ fontSize: "1.4rem", fontWeight: 600 }}>
                Become a Prograde Beta Developer
              </span>
              <br />
              <br />
              At Prograde, we understand the daily challenges faced by the vibrant commuter community in New York City. We believe that the key to a more sustainable and resilient future lies in the hands of dedicated developers like you. By signing up, you are making a significant commitment to our city's well-being.
              <br />
              <br />
              Prograde is not just a project; it's a promise to create a better tomorrow. Together, we are building a community devoted to harnessing technology to tackle climate change and enhance the lives of all NYC residents. Your skills and passion can make a profound impact, and we welcome you to be a part of this transformative journey.
              <br />
              <br />
              Become a Beta Developer today and help us shape the future of New York City.
              <br />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleOpenModal}
                sx={{ mt: 2 }}
              >
                Sign Up
              </Button>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5} sx={{ display: "none" }}>
          {/* Signup form is now in a modal */}
          <Modal
            open={modalOpen}
            onClose={handleCloseModal}
            aria-labelledby="signup-modal-title"
            aria-describedby="signup-modal-description"
          >
            <Paper elevation={12} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Sign Up
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="GitHub Profile"
                  margin="normal"
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GitHub />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="LinkedIn Profile"
                  margin="normal"
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkedIn />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>Proficiency</InputLabel>
                  <Select label="Proficiency" required>
                    <MenuItem value="beginner">Beginner</MenuItem>
                    <MenuItem value="intermediate">Intermediate</MenuItem>
                    <MenuItem value="advanced">Advanced</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>Weekly Commitment</InputLabel>
                  <Select label="Weekly Commitment" required>
                    <MenuItem value="5-10">5-10 hours</MenuItem>
                    <MenuItem value="10-20">10-20 hours</MenuItem>
                    <MenuItem value="20+">20+ hours</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="How did you hear about us?"
                  margin="normal"
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography variant="body2">Source</Typography>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Sign Up
                </Button>
              </form>
            </Paper>
          </Modal>
        </Grid>
      </Grid>
      {/* Confirmation Dialog */}
      <Dialog
        open={confirmationDialogOpen}
        onClose={handleCloseConfirmationDialog}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Thank you for signing up! Your registration was successful.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseConfirmationDialog}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default SignUp;
