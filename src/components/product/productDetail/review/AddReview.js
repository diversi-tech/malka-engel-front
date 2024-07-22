import { Button, Card, CardContent, Grid, TextareaAutosize, Typography, Box, IconButton } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import { AddReviewFunc } from "../../../../axios/ReviewsAxios";
import { useSelector } from 'react-redux';
import { Star, StarBorder } from '@mui/icons-material';

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
          style={{ color: value <= (hover || rating) ? 'gold' : 'gray', padding: '4px' }} // שיניתי מ-margin ל-padding כדי לצמצם את המרווח
        >
          {value <= (hover || rating) ? <Star style={{ fontSize: '32px' }} /> : <StarBorder style={{ fontSize: '32px' }} />}
        </IconButton>
      ))}
    </Box>
  );
};

export const AddReview = () => {
  const { currentUser, connected } = useSelector((u) => u.DataReducer_Users);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const sendYourReview = async () => {
    debugger
    if (connected) {
      const review = {
        reviewID: 0,
        productID: 14,//TODO!!
        userID: 1,//currentUser.userID,
        rating: rating || "no rating!",
        comment: comment || "no comment!",
        createdAt: "2024-07-21T19:45:23.448Z"
      };
      debugger
      const response = await AddReviewFunc(review);
      if (response.status == !true) {
        alert(t('Review sent successfully!'));
      } else {
        alert(t('Failed to send review. Please try again later.'));
      }
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
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={sendYourReview}>
            {t('Submit')}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};
