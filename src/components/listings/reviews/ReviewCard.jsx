import { FaStar } from 'react-icons/fa';
const ReviewCard = ({ userId, comment, rating, createdAt }) => {
  return (
    <div className="review-card w-full max-w-5xl py-6">
      <div className="details-container w-full flex justify-between items-center">
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-400">Service:</span>{' '}
          {comment?.serviceUsed || 'N/A'}
        </p>
        <div className="rating-container">
          <div className="reviewer-rating flex flex-row">
            {[...Array(rating).keys()].map((i) => (
              <FaStar key={i} className="text-yellow-500" />
            ))}
          </div>
          <div className="review-date text-xs text-gray-500 ">
            Posted: {createdAt?.toDate?.().toLocaleDateString?.() || 'Unknown'}
          </div>
        </div>
      </div>
      <p className="review-comment text-gray-800 mt-2">
        {comment?.body || 'No review text provided.'}
      </p>

      <hr className="my-2 border-t border-gray-200" />
    </div>
  );
};

export default ReviewCard;
