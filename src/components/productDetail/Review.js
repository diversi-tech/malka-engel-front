import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { GetAllReviews } from "../../axios/ReviewsAxios";
import { FaStar } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { fillReviewsList } from "../../redux/DataActions/DataAction.Reviews";

export const Review = () => {
  const { t, i18n } = useTranslation();
  let reviewList = useSelector(state => state.DataReducer_Reviews.ReviewsList);
  let [reviews, setReviews] = useState(reviewList);
  const myDispatch = useDispatch();
  const navigate = useNavigate();

  async function fetchReviews() {
    if (reviewList.length === 0) {
      var response = await GetAllReviews();
      setReviews(response.data); // Assuming response.data contains the list of reviews
      myDispatch(fillReviewsList(response.data));
    } else {
      setReviews(reviewList);
    }
  }

  // Call the function automatically
  useEffect(() => {
    fetchReviews();
  }, []);

  // Calculate average rating
  const averageRating = reviews.length ? (reviews.reduce((sum, review) => sum + review.Rating, 0) / reviews.length).toFixed(1) : 0;

  // Calculate ratings distribution
  const ratingsDistribution = [0, 0, 0, 0, 0]; // [5 stars, 4 stars, 3 stars, 2 stars, 1 star]
  reviews.forEach(review => {
    ratingsDistribution[5 - review.Rating]++;
  });

  const totalRatings = reviews.length;

  // Function to render star ratings based on a given rating
  const renderStars = (rating) => {
    return (
      [...Array(5)].map((_, index) => (
        <FaStar key={index} style={{ color: index < rating ? 'gold' : 'lightgray' }} />
      ))
    );
  };

  const navigateToReviewForm = () => {
    setReviews(reviewList);
    alert('Navigate to review form');
  };

  const sentToSeeStars = (numOfStar) => {
    alert('Navigate to show review form');
    navigate(`/myShowReviews/${numOfStar}`);  // Navigate to product details page with product ID
  };

  return (
    <div className="container mt-4" style={{ direction: 'rtl', textAlign: 'right' }}>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="p-4 bg-white rounded shadow-sm">
            <h2 className="mb-4" style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', fontWeight: 'bold', color: '#333' }}>ביקורות מוצר של לקוחות</h2>
            <div className="d-flex align-items-center mb-3">
              {renderStars(averageRating)}
              <span className="ml-2" style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#333' }}>{averageRating} מתוך 5 כוכבים</span>
            </div>
            <p className="font-weight-bold" style={{ fontSize: '1.2em', color: '#666' }}>{averageRating} מתוך 5</p>
            <p className="font-weight-bold" style={{ fontSize: '1.2em', color: '#666' }}>{totalRatings} דירוגים גלובליים</p>
            <div>
            {ratingsDistribution.map((percent, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <div className="col">
                    <button className="btn btn-light long" onClick={() => sentToSeeStars(5 - index)}>
                      <span className="font-weight-bold" style={{ color: '#555' }}>
                        {5 - index} כוכבים
                      </span>
                    </button>
                  </div>
                  <div className="progress w-100 mx-2" style={{ height: '1.5rem', backgroundColor: '#f1f1f1' }}>
                    <div className="progress-bar bg-warning" style={{ width: `${(percent / totalRatings) * 100}%`, borderRadius: '0' }}></div>
                  </div>
                  <span className="font-weight-bold" style={{ color: '#555' }}>{((percent / totalRatings) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
            <h3 className="mt-4" style={{ fontSize: '1.3em', fontWeight: 'bold', color: '#d9534f' }}>אפס סובלנות לביקורות מזויפות</h3>
            <button className="btn btn-lg btn-dark my-3" onClick={navigateToReviewForm} style={{ borderRadius: '0', fontWeight: 'bold', backgroundColor: '#333', color: '#fff' }}>כתוב ביקורת על מוצר זה</button>
            <p className="font-weight-bold" style={{ fontSize: '1.1em', color: '#666' }}>שתפו אחרים בדעותיכם</p>
            <button className="btn btn-lg btn-secondary" style={{ borderRadius: '0', fontWeight: 'bold', backgroundColor: '#6c757d', color: '#fff' }}>כתוב ביקורת צרכן</button>
          </div>
        </div>
      </div>
    </div>
  );
};