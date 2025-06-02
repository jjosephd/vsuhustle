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

import { Link } from 'react-router';

const ListingsPage = () => {
  const { id } = useParams(); // Get ID from URL
  const [listing, setListing] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

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
      <img
        src={imageUrl}
        alt={title || 'Listing image'}
        className="w-full h-auto object-cover rounded-md"
      />
      <div className="info-container">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="container text-sm text-gray-500">
          <p className="">{description}</p>
          <p>Uploaded on: {createdAt.toDate().toLocaleDateString()}</p>
        </div>

        <div className="tag-container mt-2 flex items-center">
          <div className="bg-secondary rounded px-3 py-1 text-xs font-bold text-white">
            {category}
          </div>
          {featured && (
            <div className=" bg-success rounded px-3 py-1 text-xs font-bold text-white ml-2">
              <div className="flex items-center">Featured</div>
            </div>
          )}
        </div>
      </div>

      <ul className="mt-6">
        <div className="font-bold text-3xl">Services</div>
        <hr className="my-2 border-t border-gray-200" />
        {renderServicesOffered()}
      </ul>

      {/* Work Images */}

      {/* Information */}

      {/* Reviews */}
    </div>
  );
};

export default ListingsPage;
