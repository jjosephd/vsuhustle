import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { fetchListingsByCategory } from '../../utils/firestore/listings';
import errorHandler from '../../utils/error/errorHandler';
import FeaturedTag, { CategoryTag } from '../../components/featured/tags';
import Grid from '../../components/listings/category/grid';

const CategoryPage = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!category) {
      setError('Category does not exist');
      setLoading(false);
      return;
    }

    const fetchListings = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedListings = await fetchListingsByCategory(category);
        setListings(fetchedListings);
      } catch (error) {
        errorHandler.general(error, 'Error fetching listings');
        console.error('Error fetching listings:', error);
        setError(error.message || 'Failed to fetch listing');
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [category]);

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

  if (listings.length === 0) {
    return (
      <div className="p-8">
        <p>No listings found.</p>
      </div>
    );
  }
  return (
    <>
      <div className="p-4">
        <h1 className="max-w-4xl text-2xl mx-auto font-bold mb-4 capitalize pt-12">
          {category} Services
        </h1>
        <Grid listings={listings} />
      </div>
    </>
  );
};
export default CategoryPage;
