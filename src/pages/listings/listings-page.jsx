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

  const ServicesOffered = ({ name, price, duration }) => {
    return (
      <li>
        <div className="w-full max-w-5xl py-6 flex justify-between">
          <div className="service-name">{name}</div>
          <div className="details-container">
            <div className="service-price">${price}</div>
            <div className="service-duration">{duration} min</div>
          </div>
        </div>
        <hr className="my-8 border-t border-gray-200" />
      </li>
    );
  };

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
    <div className="py-8 px-16">
      <h1 className="text-3xl font-bold">{listing.title}</h1>
      <div className="mt-4 w-full max-w-[800px] max-h-[600px]">
        <img
          src={listing.imageUrl}
          alt={listing.title || 'Listing image'}
          className="w-full max-w-4xl h-auto object-cover rounded-md"
        />
      </div>
      <p className="text-gray-600 mt-2">{listing.category}</p>
      <p className="mt-4">{listing.description}</p>
      <ul className="mt-2 max-w-2xl">{renderServicesOffered()}</ul>
    </div>
  );
};

export default ListingsPage;
