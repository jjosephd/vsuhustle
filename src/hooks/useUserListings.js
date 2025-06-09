import { useEffect, useState } from 'react';
import { fetchListingsByUserId } from '../utils/firestore/listings';

const useUserListings = (userId) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchListings = async () => {
      try {
        const data = await fetchListingsByUserId(userId);
        setListings(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [userId]);

  return { listings, loading, error };
};

export default useUserListings;
