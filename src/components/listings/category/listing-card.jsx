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
        console.log(reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviewsError(error.message || 'Failed to fetch reviews');
      }
    };

    fetchReviews();
  }, [id]);

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalScore = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalScore / reviews.length;
  };

  const renderServicesOffered = () =>
    servicesOffered
      ? Object.entries(servicesOffered).map(
          ([name, { price, duration }], i) => (
            <ServicesOffered
              key={i}
              name={name}
              price={price}
              duration={duration}
            />
          )
        )
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
    <li className="w-4xl border border-gray-700/10 rounded-lg p-4 shadow-sm hover:shadow-md grid sm:grid-cols-2 gap-4">
      <div className="col-span-1">
        <img
          src={imageUrl}
          alt={title}
          className="h-full max-h-72 w-full  object-cover mb-2 rounded-xl"
          loading="lazy"
        />
        <div className="view-lisitng">
          <button
            className="btn btn-xs btn-primary w-full"
            onClick={() => navigate(`/listings/${id}`)}
          >
            View Listing
          </button>
        </div>
      </div>

      <div className="col-span-1">
        <h2 className="text-sm font-semibold">{title}</h2>
        <p className="text-sm mb-1">
          Price:{' '}
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(price)}
        </p>
        <div className="tag-container flex items-center gap-1 py-1">
          {featured && <FeaturedTag />}
          <CategoryTag category={category} />
          <ScoreTag score={getAverageRating()} />
        </div>
        <p className="text-xs">{description}</p>
        <ul className="mt-6 ">
          <hr className="my-2 border-t border-gray-200" />
          {renderServicesOffered()}
        </ul>

        <p className="text-xs text-gray-500">
          Posted: {new Date(createdAt?.toDate()).toLocaleString()}
        </p>
      </div>
    </li>
  );
};

export default ListingCard;
