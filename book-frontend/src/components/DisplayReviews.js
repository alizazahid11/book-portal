

import React from 'react';

const DisplayReviews = ({ reviews }) => {
  return (
    <div className="review-list">
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <div key={review._id} className="review">
          <p><strong>{review.username}</strong>: {review.reviewText}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayReviews;
