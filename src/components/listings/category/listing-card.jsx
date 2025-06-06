import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { fetchReviewsForListing } from '../../../utils/firestore/listings';
import FeaturedTag, { CategoryTag, ScoreTag } from '../../featured/tags';
import { Link } from 'react-router';
import { FaRegBookmark } from 'react-icons/fa';
import { BiShare } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa';

const ListingCard = ({
  id,
  title,
  category,
  description,
  imageUrl,
  featured,
  price,
  createdAt,
  servicesOffered,
}) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [reviewsError, setReviewsError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await fetchReviewsForListing(id);
        setReviews(reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviewsError(error.message || 'Failed to fetch reviews');
      }
    };

    fetchReviews();
  }, [id]);

  const getAverageRating = () => {
    if (reviews.length === 0) return null;
    const totalScore = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalScore / reviews.length;
  };

  const renderServicesOffered = () =>
    servicesOffered
      ? Object.entries(servicesOffered)
          .slice(0, 3)
          .map(([name, { price, duration }], i) => (
            <ServicesOffered
              key={i}
              name={name}
              price={price}
              duration={duration}
            />
          ))
      : null;

  const ServicesOffered = ({ name, price, duration }) => {
    return (
      <li>
        <div className="w-full max-w-5xl  ">
          <div className="details-container w-full flex justify-between items-center">
            <div className="service-name">{name}</div>
            <div className="service-price">${price.toFixed(2)}</div>
          </div>

          <div className="service-duration text-right">{duration} min</div>
          <div className="btn-container flex justify-end">
            <Link to="/book" className="btn btn-xs btn-secondary font-bold">
              Book Now
            </Link>
            <button className="btn btn-xs btn-primary">
              <FaRegBookmark />
            </button>
            <button className="btn btn-xs btn-primary">
              <BiShare />
            </button>
          </div>
        </div>
        <hr className="my-2 border-t border-gray-200" />
      </li>
    );
  };

  return (
    <li className="w-4xl border border-gray-700/10 rounded-lg p-4 shadow-sm hover:shadow-md">
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Left column - Image only */}
        <div className="col-span-1">
          <img
            src={imageUrl || 'https://placehold.co/600x400'}
            alt={title}
            className="h-full max-h-72 w-full object-cover rounded-xl"
            loading="lazy"
          />
        </div>

        {/* Right column - All content */}
        <div className="col-span-1 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>

          <div className="tag-container flex items-center gap-1 py-1 mb-2">
            {featured && <FeaturedTag />}
            <CategoryTag category={category} />
            <ScoreTag rating={getAverageRating()} />
          </div>

          <p className="text-xs mb-4">{description}</p>

          <ul className="flex-1">
            <hr className="my-2 border-t border-gray-200" />
            {renderServicesOffered()}
          </ul>

          <p className="text-xs text-gray-500 mb-2">
            Posted: {new Date(createdAt?.toDate()).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Button outside the grid, spanning full width */}
      <div className="mt-4">
        <button
          className="btn btn-xs btn-primary w-full"
          onClick={() => navigate(`/listings/${id}`)}
        >
          View Listing
        </button>
      </div>
    </li>
  );
};

export default ListingCard;
