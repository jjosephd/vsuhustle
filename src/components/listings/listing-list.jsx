import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

const ListingList = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <p>Loading listings...</p>;
  if (listings.length === 0) return <p>No listings found.</p>;

  return (
    <ul className="flex gap-2 ">
      {listings.map((listing) => (
        <li
          key={listing.id}
          className="border border-gray-700/20 w-xs rounded-lg p-4 shadow-sm hover:shadow-md"
        >
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="h-50 w-full object-cover mb-2 rounded-xl"
            loading="lazy"
          />
          {console.log(listing.imageUrl)}
          <h2 className="text-lg font-semibold">{listing.title}</h2>
          <p className="text-sm text-gray-600 mb-1">
            Category: {listing.category}
          </p>
          <p className="text-sm text-gray-600 mb-1">Price: {listing.price}</p>
          <p className="text-sm">{listing.description}</p>
          <p className="text-xs text-gray-500">
            Posted: {listing.createdAt?.toDate().toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default ListingList;
