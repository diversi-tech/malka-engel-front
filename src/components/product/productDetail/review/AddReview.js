import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Button, Card, CardContent, Grid, TextareaAutosize, Typography, Box, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { AddReviewFunc } from '../../../../axios/ReviewsAxios';
import { useTranslation } from 'react-i18next';
import MuiAlert from '@mui/material/Alert';

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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const handleClose = () => { navigate(-1); };
  const [showModal, setShowModal] = useState(false);


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
        } else {
          navigate(`/myErrorPage/500/${t('errorPage.message')}/back`)
        }
      } catch (error) {
        navigate(`/myErrorPage/500/${t('errorPage.message')}/back`)
      }
      setShowModal(true);
    } else {
      navigate('/myLogin');
    }
  };

  return (
  <>
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
    </Grid>
    <Modal open={showModal} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 600, p: 3, bgcolor: 'background.paper', borderRadius: 1 }}>

        <Typography variant="h5" align="center">
          תודה לך, חוות הדעת שלך נוספה בהצלחה
        </Typography>
        <Button variant="outlined" color="secondary" onClick={handleClose} sx={{ mt: 2 }}>
          חזור
        </Button>
      </Box>
    </Modal>
  </>
  );
};

