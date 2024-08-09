import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardContent, Grid, TextareaAutosize, Typography, Box, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { AddReviewFunc } from '../../../../axios/ReviewsAxios';
import { useTranslation } from 'react-i18next';

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
  const { productId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser, connected } = useSelector((u) => u.DataReducer_Users);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogSeverity, setDialogSeverity] = useState('success');
  const [loading, setLoading] = useState(false);

  const sendYourReview = async () => {
    if (connected) {
      setLoading(true); // Start loading
      const review = {
        reviewID: 0,
        productID: productId,
        userID: currentUser.userID,
        rating: rating || "no rating!",
        comment: comment || "no comment!",
        createdAt: new Date().toISOString()
      };
      try {
        const response = await AddReviewFunc(review);
        if (response === true) {
          setDialogMessage(t('Review sent successfully!'));
          setDialogSeverity('success');
        } else {
          setDialogMessage(t('Failed to send review. Please try again later.'));
          setDialogSeverity('error');
        }
      } catch (error) {
        setDialogMessage(t('Failed to send review. Please try again later.'));
        setDialogSeverity('error');
      } finally {
        setLoading(false); // End loading
        setDialogOpen(true);
        navigate(-1);
      }
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
            disabled={loading} // Disable the button while loading
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : t('Submit')}
          </Button>
        </CardContent>
      </Card>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle>{dialogSeverity === 'success' ? t('Success') : t('Error')}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            {t('Close')}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default AddReview;
