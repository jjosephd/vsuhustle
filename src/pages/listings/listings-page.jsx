import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import {
  fetchListingById,
  fetchReviewsForListing,
} from '../../utils/firestore/listings';
import { FaRegBookmark } from 'react-icons/fa';
import { BiShare } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa';

import { Link } from 'react-router';

const ListingsPage = () => {
  const { id } = useParams(); // Get ID from URL
  const [listing, setListing] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewsError, setReviewsError] = useState(null);

  useEffect(() => {
    // Check if id exists before making the API call
    if (!id) {
      setError('No listing ID provided');
      setLoading(false);
      return;
    }

    const fetchListing = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedListing = await fetchListingById(id);
        setListing(fetchedListing);
      } catch (error) {
        console.error('Error fetching listing:', error);
        setError(error.message || 'Failed to fetch listing');
      } finally {
        setLoading(false);
      }
    };

    // Fetch listing when id changes

    // Fetch reviews of the listing
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
    fetchListing();
  }, [id]);

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

  const ListingImage = ({ imageUrl, title }) => (
    <img
      src={imageUrl}
      alt={title || 'Listing image'}
      className="w-full h-auto object-cover rounded-md"
    />
  );

  const ListingDescription = ({ description }) => (
    <p className="text-sm text-gray-500">{description}</p>
  );

  const ListingMeta = ({ createdAt, category, featured }) => (
    <div className="tag-container mt-2 flex items-center">
      <CategoryTag category={category} />
      {featured && <FeaturedTag />}
    </div>
  );

  const CategoryTag = ({ category }) => (
    <div className="bg-secondary rounded px-3 py-1 text-xs font-bold text-white">
      {category}
    </div>
  );

  const FeaturedTag = () => (
    <div className=" bg-success rounded px-3 py-1 text-xs font-bold text-white ml-2">
      <div className="flex items-center">Featured</div>
    </div>
  );

  const ServicesOffered = ({ name, price, duration }) => {
    return (
      <li>
        <div className="w-full max-w-5xl py-6 ">
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

  const ReviewCard = ({ userId, comment, rating, createdAt }) => {
    return (
      <div className="review-card w-full max-w-5xl py-6">
        <div className="details-container w-full flex justify-between items-center">
          <div className="reviewer-name">{userId}</div>
          <div className="rating-container">
            <div className="reviewer-rating flex flex-row">
              {[...Array(rating).keys()].map((i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
            </div>
            <div className="review-date text-xs text-gray-500 ">
              Posted: {createdAt.toDate().toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="review-comment">{comment}</div>

        <hr className="my-2 border-t border-gray-200" />
      </div>
    );
  };

  /**
   * Returns a list of <ServicesOffered /> components, one for each service
   * listed in the `servicesOffered` field of the `listing` object.
   *
   *
   * Object entries are destructured to obtain the name, price, and duration of each service.
   * If `servicesOffered` is not defined, returns null.
   */
  const renderServicesOffered = () => {
    if (listing.servicesOffered) {
      return Object.entries(listing.servicesOffered).map(
        ([name, { price, duration }]) => (
          <ServicesOffered
            key={name}
            name={name}
            price={price}
            duration={duration}
          />
        )
      );
    }
    return null;
  };

  return (
    <div className="py-8 px-4 max-w-5xl ">
      <ListingImage imageUrl={imageUrl} title={title} />
      <div className="info-container">
        <h1 className="text-3xl font-bold">{title}</h1>
        <ListingDescription description={description} />
        <ListingMeta
          createdAt={createdAt}
          category={category}
          featured={featured}
        />
      </div>

      <ul className="mt-6 ">
        <div className="font-bold text-3xl py-4">Services</div>
        <hr className="my-2 border-t border-gray-200" />
        {renderServicesOffered()}
      </ul>

      {/* Work Images */}

      {/* Information */}

      {/* Reviews */}
      <div className="mt-6">
        <div className="font-bold text-3xl py-4">Reviews</div>
        <hr className="my-2 border-t border-gray-200" />
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </div>
  );
};

export default ListingsPage;
