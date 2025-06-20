import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router';
import FeaturedTag, { CategoryTag } from './tags';
import FeaturedListingCard from './FeaturedListingCard';

import { fetchAllListings } from '../../utils/firestore/listings';
import { handleError } from '../../utils/error/errorHandler';

const FeaturedListingList = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const q = query(
          collection(db, 'listings'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setListings(data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <p>Loading listings...</p>;
  if (listings.length === 0) return <p>No listings found.</p>;

  return (
    <ul className="flex flex-row gap-4">
      {listings.map(
        (listing) =>
          listing.featured && (
            <li
              key={listing.id}
              className="max-w-xs border border-gray-700/20 rounded-lg p-4 shadow-sm hover:shadow-md hover:cursor-pointer"
              onClick={() => navigate(`/listings/${listing.id}`)}
            >
              <img
                src={listing.imageUrl}
                alt={listing.title}
                className="h-50 w-full object-cover mb-2 rounded-xl"
                loading="lazy"
              />
              <h2 className="text-sm font-semibold">{listing.title}</h2>

              <p className="text-xs">{listing.description}</p>
              <div className="tag-container flex items-center gap-1 py-1">
                <CategoryTag category={listing.category} />
                {listing.featured && <FeaturedTag />}
              </div>
              <p className="text-xs text-gray-500">
                Posted: {new Date(listing.createdAt?.toDate()).toLocaleString()}
              </p>
            </li>
          )
      )}
    </ul>
  );
};

export default FeaturedListingList;
