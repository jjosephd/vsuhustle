import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { fetchListingsByCategory } from '../../utils/firestore/listings';
import errorHandler from '../../utils/error/errorHandler';
import FeaturedTag, { CategoryTag } from '../../components/featured/tags';

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
    <ul className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4 py-24">
      {listings.map(
        ({
          id,
          title,
          category,
          description,
          imageUrl,
          featured,
          price,
          createdAt,
        }) => {
          return (
            <li
              key={id}
              className="w-xs border border-gray-700/20 rounded-lg p-4 shadow-sm hover:shadow-md hover:cursor-pointer"
              onClick={() => navigate(`/listings/${id}`)}
            >
              <img
                src={imageUrl}
                alt={title}
                className="h-50 w-full object-cover mb-2 rounded-xl"
                loading="lazy"
              />
              <h2 className="text-sm font-semibold">{title}</h2>
              <p className="text-sm mb-1">
                Price:{' '}
                {Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(price)}
              </p>
              <p className="text-xs">{description}</p>
              <div className="tag-container flex items-center gap-1 py-1">
                <CategoryTag category={category} />
                {featured && <FeaturedTag />}
              </div>
              <p className="text-xs text-gray-500">
                Posted: {new Date(createdAt?.toDate()).toLocaleString()}
              </p>
            </li>
          );
        }
      )}
    </ul>
  );
};
export default CategoryPage;
