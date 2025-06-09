import { useEffect, useState } from 'react';
import { fetchListingById } from '../utils/firestore/listings';
import { fetchReviewsForListing } from '../utils/firestore/reviews';

const useListingDetail = (id) => {
  const [listing, setListing] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewsError, setReviewsError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('No listing ID provided');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedListing = await fetchListingById(id);
        const fetchedReviews = await fetchReviewsForListing(id);
        setListing(fetchedListing);
        setReviews(fetchedReviews);
      } catch (err) {
        setError(err.message || 'Failed to fetch listing');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return {
    listing,
    reviews,
    loading,
    error,
    reviewsError,
  };
};

export default useListingDetail;
