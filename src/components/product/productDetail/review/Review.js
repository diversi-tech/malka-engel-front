import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { GetReviewByProd } from "../../../../axios/ReviewsAxios";
import { useNavigate } from "react-router-dom";
import { fillReviewsProduct } from "../../../../redux/DataActions/DataAction.Reviews";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Container,
  Grid,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/system';
import GoBackButton from "../../../Layout Components/GoBackButton";

const StarContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

const StarIconStyled = styled(StarIcon)(({ theme }) => ({
    color: theme.palette.primary.main
}));

export const Review = ({ productId }) => {
  const { t, i18n } = useTranslation();
  let reviewList = useSelector((s) => s.DataReducer_Reviews.ReviewsProduct);
  let [reviews, setReviews] = useState(reviewList);
  const myDispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, connected } = useSelector(u => u.DataReducer_Users);


  async function fetchReviews() {
    if (reviewList.length === 0) {
      try {
        const response = await GetReviewByProd(productId);
        setReviews(response.data);
        myDispatch(fillReviewsProduct(response.data));
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    } else {
      setReviews(reviewList);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  let totalRating = 0;

  for (let i = 0; i < reviews.length; i++) {
    console.log("review " + reviews[i] + " has " + i)
    totalRating += reviews[i].Rating;
    console.log("total rating " + totalRating)
  }

  const averageRating = 4;
  //TODO:
  // reviews.length ? (totalRating / reviews.length).toFixed(1) : 0;

  const ratingsDistribution = [0, 0, 0, 0, 0];
  if (reviews && Array.isArray(reviews) && reviews.length > 0) {
    reviews.forEach((review) => {
      ratingsDistribution[5 - review.rating]++;
    });
  }

  const totalRatings = reviews.length || 0;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <StarIconStyled
        key={index}
        style={{ color: index < rating ? 'gold' : 'lightgray' }}
      />
    ));
  };

  const navigateToReviewForm = () => {
    if (!connected)
      navigate('/myLogin')
    else {
      navigate(`/myiview`);
    };
  }

  const sentToSeeStars = (numOfStar) => {
    navigate(`/myShowReviews/${numOfStar}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <Card sx={{ p: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontFamily: 'Segoe UI', fontWeight: 'bold', color: '#333' }}
              >
                ביקורות מוצר של לקוחות
              </Typography>
              <Box display="flex" alignItems="center" mb={3}>
                {renderStars(averageRating)}
                <Typography variant="h6" ml={2} sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }} >
                  {averageRating} מתוך 5 כוכבים
                </Typography>
              </Box>
              <Typography variant="subtitle1" sx={{ color: '#666' }}>
                {totalRatings} דירוגים גלובליים
              </Typography>
              <Box>
                {Array.isArray(ratingsDistribution) && ratingsDistribution.length > 0 ? (
                  ratingsDistribution.map((percent, index) => (
                    <Box key={index} display="flex" alignItems="center" mb={1}>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => sentToSeeStars(5 - index)}
                      >
                        {5 - index} כוכבים
                      </Button>
                      <LinearProgress
                        variant="determinate"
                        value={totalRatings > 0 ? (percent / totalRatings) * 100 : 0}
                        sx={{
                          flexGrow: 1,
                          mx: 2,
                          height: '10px',
                          backgroundColor: '#f1f1f1',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#ffc107',
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ color: '#555' }}>
                        {totalRatings > 0 ? ((percent / totalRatings) * 100).toFixed(0) : 0}%
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2">אין ביקורות זמינות</Typography>
                )}
              </Box>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={navigateToReviewForm}
                sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}
              >
                כתוב ביקורת על מוצר זה
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <GoBackButton></GoBackButton>
    </Container>
  );
};


