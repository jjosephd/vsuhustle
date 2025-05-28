import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { fetchListingById } from '../../utils/firestore/listings';

const ListingsPage = () => {
  const { id } = useParams(); // Get ID from URL
  const [listing, setListing] = useState(null);
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

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{listing.title}</h1>
      <div className="mt-4 w-full max-w-[800px] max-h-[600px]">
        <img
          src={listing.imageUrl}
          alt={listing.title || 'Listing image'}
          className="w-full h-auto object-cover rounded-md"
        />
      </div>
      <p className="text-gray-600 mt-2">{listing.category}</p>
      <p className="mt-4">{listing.description}</p>
    </div>
  );
};

export default ListingsPage;
