

import React, { useState } from 'react';

const ReviewForm = ({ addReview }) => {
  const [username, setUsername] = useState('');
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReview({ username, reviewText });
      setUsername('');
      setReviewText('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div className="review-form">
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
