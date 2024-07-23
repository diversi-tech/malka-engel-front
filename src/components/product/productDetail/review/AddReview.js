import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Grid, TextareaAutosize, Typography, Box, IconButton, Snackbar } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import { AddReviewFunc } from '../../../../axios/ReviewsAxios';
import { useTranslation } from 'react-i18next';

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      {[1, 2, 3, 4, 5].map((value) => (
        <IconButton
          key={value}
          onClick={() => handleRating(value)}
          onMouseEnter={() => setHover(value)}
          onMouseLeave={() => setHover(0)}
          style={{ color: value <= (hover || rating) ? 'gold' : 'gray', padding: '4px' }}
        >
          {value <= (hover || rating) ? <Star style={{ fontSize: '32px' }} /> : <StarBorder style={{ fontSize: '32px' }} />}
        </IconButton>
      ))}
    </Box>
  );
};

export const AddReview = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser, connected } = useSelector((u) => u.DataReducer_Users);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const sendYourReview = async () => {
    if (connected) {
      const review = {
        reviewID: 0,
        productID: 14, // TODO: Replace with actual product ID
        userID: currentUser.userID,
        rating: rating || "no rating!",
        comment: comment || "no comment!",
        createdAt: new Date().toISOString()
      };
      try {
        const response = await AddReviewFunc(review);
        debugger
        if (response == !true) {
          setSnackbarMessage(t('Review sent successfully!'));
          setSnackbarSeverity('success');
        } else {
          setSnackbarMessage(t('Failed to send review. Please try again later.'));
          setSnackbarSeverity('error');
        }
      } catch (error) {
        setSnackbarMessage(t('Failed to send review. Please try again later.'));
        setSnackbarSeverity('error');
      }
      setSnackbarOpen(true);
    } else {
      navigate('/myLogin');
    }
  };

  return (
    <Grid item xs={12}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">
            {t('More Details')}
          </Typography>
          <Typography variant="body2" paragraph>
            {t('Placeholder for more details about the product.')}
          </Typography>
          <TextareaAutosize
            minRows={3}
            placeholder={t('Enter more details...')}
            style={{ width: '100%', padding: '8px' }}
            onChange={(e) => setComment(e.target.value)}
          />
          <Typography variant="body1" gutterBottom>
            {t('Your Rating:')}
          </Typography>
          <StarRating rating={rating} setRating={setRating} />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={sendYourReview}
          >
            {t('Submit')}
          </Button>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        action={
          <Button color="inherit" onClick={() => setSnackbarOpen(false)}>
            Close
          </Button>
        }
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};
