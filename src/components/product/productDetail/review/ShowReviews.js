import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, Typography, IconButton, Grid, TextareaAutosize, Button } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { AddReview } from "./AddReview";

export const ShowReviews = () => {
    debugger
    let param = useParams();
    const { t, i18n } = useTranslation();
    const reviewList = useSelector(state => state.DataReducer_Reviews.ReviewsProduct);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (reviewList) {
            const filteredReviews = reviewList.filter(review => review.rating === parseInt(param.numStars));
            setReviews(filteredReviews);
        }
    }, [reviewList, param.numStars]);

    // Simulate user authentication (replace this with your actual authentication logic)
    const isAuthenticated = true;

    // Handle feedback (like/dislike) increment
    const handleFeedback = (reviewId, feedbackType) => {
        if (!isAuthenticated) {
            alert('You need to be logged in to give feedback');
            return;
        }

        setReviews(reviews.map(review => {
            if (review.reviewID === reviewId) {
                if (feedbackType === 'like') {
                    return { ...review, likes: (review.likes || 0) + 1 };
                } else if (feedbackType === 'dislike') {
                    return { ...review, dislikes: (review.dislikes || 0) + 1 };
                }
            }
            return review;
        }));
    };

    const renderStars = (rating) => {
        return (
            [...Array(5)].map((_, index) => (
                <FaStar key={index} style={{ color: index < rating ? 'gold' : 'lightgray' }} />
            ))
        );
    };

    return (
        <Box sx={{ width: '80%', margin: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                {t('The all reviews for')} {param.numStars} {t('stars')}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                {t('This is personal opinions from our customers')}
            </Typography>
            <Grid container spacing={2}>
                {reviews && reviews.length > 0 ? reviews.map(review => (
                    <Grid item xs={12} key={review.reviewID}>
                        <Card variant="outlined">
                            <CardContent>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="h6">
                                        {review.productId}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        {review.userId}
                                    </Typography>
                                </Box>
                                <Box mb={2}>
                                    {renderStars(review.rating)}
                                </Box>
                                <Typography variant="body2" paragraph>
                                    {review.comment}
                                </Typography>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <IconButton onClick={() => handleFeedback(review.reviewID, 'like')}>
                                            <ThumbUpAltIcon />
                                        </IconButton>
                                        <Typography variant="caption">{review.likes || 0}</Typography>
                                        <IconButton onClick={() => handleFeedback(review.reviewID, 'dislike')}>
                                            <ThumbDownAltIcon />
                                        </IconButton>
                                        <Typography variant="caption">{review.dislikes || 0}</Typography>
                                    </Box>
                                    <Typography variant="caption">
                                        {review.createdAt}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                )) : (
                    <Typography variant="body1">{t('No reviews available')}</Typography>
                )}
                <AddReview></AddReview>
            </Grid>
        </Box>
    );
};
