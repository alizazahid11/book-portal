import React, { useState, useEffect } from 'react';
import ReviewForm from '../components/ReviewForm'; // Assuming you have a ReviewForm component
import DisplayReviews from '../components/DisplayReviews'; // Assuming you have a DisplayReviews component

const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:8001/reviews');
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const addReview = async (newReview) => {
    try {
      const response = await fetch('http://localhost:8001/add-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });
      if (!response.ok) {
        throw new Error('Failed to add review');
      }
      const data = await response.json();
      setReviews([...reviews, data]);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div >
      <h2 className="fe-hea">Give Us Feedback</h2>
      <ReviewForm addReview={addReview} />
      <DisplayReviews reviews={reviews} />
    </div>
  );
};

export default Review;
