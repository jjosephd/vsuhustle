import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { fetchListingsByCategory } from '../../utils/firestore/listings';

const CategoryPage = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);

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
        console.error('Error fetching listing:', error);
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
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 pt-24">
      {listings.map(({ id, title, category, description, imageUrl }) => {
        return (
          <li key={id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-gray-600">{category}</p>
            <p>{description}</p>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={title}
                className="mt-2 w-full h-48 object-cover rounded"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};
export default CategoryPage;
