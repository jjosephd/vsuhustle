// hooks/useAllListings.js
import { useState, useEffect } from 'react';
import { fetchAllListings } from '../utils/firestore/listings';

const useAllListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const all = await fetchAllListings(); // Firestore query
        setListings(all);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { listings, loading, error };
};

export default useAllListings;
