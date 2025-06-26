"use client";

import { useState } from "react";
import { Star } from "lucide-react";

// Sample reviews data - you can replace this with actual data
const reviewsData = [
  {
    id: 1,
    customerName: "Ramesh",
    date: "December 19, 2023",
    timeAgo: "1 day ago",
    rating: 4,
    title: "The Products I purchased was too good.",
    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pellentesque id dui eget venenatis. In hac habitasse platea dictumst. Pellentesque lacinia placerat nisl, non sagittis urna porttitor a. Vivamus nunc metus cursus auctor venenatis vel vel sem.",
    status: "pending"
  },
  {
    id: 2,
    customerName: "Suresh",
    date: "December 09, 2023",
    timeAgo: "2 day ago",
    rating: 4,
    title: "The Products I purchased was too good.",
    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pellentesque id dui eget venenatis. In hac habitasse platea dictumst. Pellentesque lacinia placerat nisl, non sagittis urna porttitor a. Vivamus nunc metus cursus auctor venenatis vel vel sem.",
    status: "pending"
  }
];

function StarRating({ rating, maxRating = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating 
              ? "fill-green-500 text-green-500" 
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-500">({rating}/5)</span>
    </div>
  );
}

function ReviewCard({ review, onApprove, onReject }) {
  return (
    <div className="border-2 rounded-lg p-6 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg mb-2">{review.customerName}</h3>
          <div className="flex flex-col text-sm text-gray-500 space-y-1">
            <span>{review.date}</span>
            <span>{review.timeAgo}</span>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      
      <h4 className="font-semibold text-gray-900 text-base mb-3">{review.title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed mb-8">{review.review}</p>
      
      <div className="flex justify-end gap-4">
        <button
          onClick={() => onReject(review.id)}
          className="px-6 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors font-medium"
        >
          Reject
        </button>
        <button
          onClick={() => onApprove(review.id)}
          className="px-8 py-2 bg-[#005226] text-white rounded text-sm hover:bg-[#003917] transition-colors font-medium"
        >
          Approve
        </button>
      </div>
    </div>
  );
}

export default function ReviewsTable() {
  const [reviews, setReviews] = useState(reviewsData);

  const handleApprove = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, status: 'approved' }
        : review
    ));
    // You can add API call here to update the backend
    console.log(`Approved review ${reviewId}`);
  };

  const handleReject = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, status: 'rejected' }
        : review
    ));
    // You can add API call here to update the backend
    console.log(`Rejected review ${reviewId}`);
  };  const pendingReviews = reviews.filter(review => review.status === 'pending');

  return (
    <div className="space-y-6">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">No reviews available</h3>
            <p>No reviews to display.</p>
          </div>
        </div>
      )}
    </div>
  );
}
