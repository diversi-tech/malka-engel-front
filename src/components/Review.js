import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { GetAllReviews } from "../axios/ReviewsAxios";
import { FaStar } from 'react-icons/fa';
import { fillReviewsList } from "../redux/DataActions/DataAction.Reviews";

export const Review = () => {
  const { t, i18n } = useTranslation();
  let reviewList = useSelector(state => state.DataReducer_Reviews.ReviewsList);
  let [reviews, setReviews] = useState(reviewList);
  const myDispatch = useDispatch();


  async function fetchReviews() {
    if (reviewList.length == 0) {
      var response = await GetAllReviews();
      //console.log(response.data);
      debugger
      setReviews(response.data); // Assuming response.data contains the list of reviews
      myDispatch(fillReviewsList(response.data));
    }
    else {
      setReviews(reviewList);
      console.log('Error fetching reviews:');
    }
  }

  //call the function automatically
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
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="fa fa-star checked" style={{ color: 'gold' }}></span>);
      } else {
        stars.push(<span key={i} className="fa fa-star"></span>);
      }
    }
    return stars;
  };

  // Function to handle user feedback (happy/sad)
  const handleFeedback = (reviewId, feedbackType) => {
    // Implement logic to handle user feedback (e.g., update state, send to server)
    console.log(`User feedback for review ${reviewId}: ${feedbackType}`);
  };
  const f = () => {
    alert('have to navigate to reviewFomr');
  }

  return (
    <div className="container mt-4" style={{ direction: 'rtl', textAlign: 'right' }}>
      <div className="row">
        {/* Product reviews section */}
        <div className="col-md-4 mb-4">
          <h2 className="mb-4">ביקורות מוצר של לקוחות</h2>
          <div className="d-flex align-items-center mb-3">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} style={{ color: index < averageRating ? 'gold' : 'lightgray' }} />
            ))}
            <span className="ml-2" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{averageRating} מתוך 5 כוכבים</span>
          </div>
          <p>{averageRating} מתוך 5</p>
          <p>{totalRatings} דירוגים גלובליים</p>
          <div>
            {ratingsDistribution.map((percent, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <span>{5 - index} כוכבים</span>
                <div className="progress w-100 mx-2">
                  <div className="progress-bar" style={{ width: `${(percent / totalRatings) * 100}%`, backgroundColor: '#ffc107' }}></div>
                </div>
                <span>{((percent / totalRatings) * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
          <h3 className="mt-4">אפס סובלנות לביקורות מזויפות</h3>
          <button className="btn btn-primary my-3" onClick={f}>כתוב ביקורת על מוצר זה</button>
          <p>שתפו אחרים בדעותיכם</p>
          <button className="btn btn-primary">כתוב ביקורת צרכן</button>
        </div>

        {/* More details section */}
        {/* for more detail - dont touch please!! */}
        {/*   
          <div className="col-md-8">
            {reviews.map(review => (
              <div className="card mb-3" key={review.ReviewID}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{review.ProductId}</h5>
                    <span>{review.UserId}</span>
                  </div>
                  <div className="card-text mb-2">{renderStars(review.Rating)}</div>
                  <p className="card-text">{review.Comment}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group" role="group" aria-label="User feedback">
                      <button className="btn btn-outline-success" onClick={() => handleFeedback(review.ReviewID, 'happy')}>
                        😊 Happy
                      </button>
                      <button className="btn btn-outline-danger" onClick={() => handleFeedback(review.ReviewID, 'sad')}>
                        😞 Sad
                      </button>
                    </div>
                    <small className="text-muted">{review.CreatedAt}</small>
                  </div>
                </div>
              </div>
            ))}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">More Details</h5>
                <p className="card-text">Placeholder for more details about the product.</p>
                <textarea className="form-control mb-3" placeholder="Enter more details..."></textarea>
                <button className="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>*/}
      </div>
    </div>);
};