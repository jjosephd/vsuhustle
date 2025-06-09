import { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router';
import { FaRegBookmark, FaStar } from 'react-icons/fa';
import { BiShare } from 'react-icons/bi';

import useListingDetail from '../../hooks/useListingDetail';
import errorHandler from '../../utils/error/errorHandler';
import FeaturedTag, { CategoryTag } from '../../components/featured/tags';
import ContactCard from '../../components/contact/contact-card';
import ReviewCard from '../../components/listings/reviews/ReviewCard';

const ListingsPage = () => {
  const { id } = useParams();
  const { listing, reviews, loading, error, reviewsError } =
    useListingDetail(id);

  const [totalReviews, setTotalReviews] = useState(false);

  if (loading) {
    return (
      <div className="p-8">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="p-8">
        <p>Listing not found.</p>
      </div>
    );
  }

  const {
    title,
    description,
    servicesOffered,
    imageUrl,
    category,
    createdAt,
    featured,
  } = listing;

  const toggleTotalReviews = () => {
    setTotalReviews(!totalReviews);
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalScore = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalScore / reviews.length;
  };

  const renderServicesOffered = () =>
    servicesOffered
      ? Object.entries(servicesOffered).map(
          ([name, { price, duration }], i) => (
            <li key={i}>
              <div className="w-full max-w-5xl py-6">
                <div className="details-container w-full flex justify-between items-center">
                  <div className="service-name">{name}</div>
                  <div className="service-price">${price.toFixed(2)}</div>
                </div>
                <div className="service-duration text-right">
                  {duration} min
                </div>
                <div className="btn-container flex justify-end">
                  <Link
                    to="/book"
                    className="btn btn-xs btn-secondary font-bold"
                  >
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
          )
        )
      : null;

  return (
    <div className="pb-4 px-4 w-full max-w-7xl flex flex-wrap mx-auto md:grid md:grid-cols-3 gap-12">
      <div className="listing-container flex flex-col md:col-span-2">
        <div className="listing-image-container w-full aspect-[3/2] sm:aspect-[4/3] max-h-[600px] overflow-hidden rounded-md">
          <img
            src={imageUrl || 'https://placehold.co/600x400'}
            alt={title ?? 'Listing image'}
            className="listing-image w-full h-full object-cover"
            onError={(e) => (e.target.src = 'https://placehold.co/600x400')}
          />
        </div>

        <div className="info-container">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-sm text-gray-500">{description}</p>
          <div className="tag-container mt-2 flex items-center">
            <CategoryTag category={category} />
            {featured && <FeaturedTag />}
          </div>
        </div>

        <ul className="mt-6">
          <div className="font-bold text-3xl py-4">Services</div>
          <hr className="my-2 border-t border-gray-200" />
          {renderServicesOffered()}
        </ul>

        <div className="mt-6">
          <div className="header-container flex justify-between items-center">
            <div className="font-bold text-3xl py-4">Reviews</div>
            <div className="review-score flex flex-col items-center">
              <div
                aria-label="Average Rating"
                className="average-rating bg-gray-500 font-bold text-white rounded px-3 py-1 text-xs hover:cursor-pointer"
                onClick={toggleTotalReviews}
              >
                <span>Average Rating:</span> {getAverageRating().toFixed(1)}
              </div>
              <span
                className={`text-xs transition-all ease-in-out duration-100 ${
                  totalReviews ? '' : 'opacity-0'
                }`}
              >
                {reviews.length > 0 && ` ${reviews.length} reviews`}
              </span>
            </div>
          </div>
          <hr className="my-2 border-t border-gray-200" />
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      </div>

      <div className="contact-container w-full max-w-5xl flex flex-col items-center">
        <ContactCard {...listing} />
      </div>
    </div>
  );
};

export default ListingsPage;
