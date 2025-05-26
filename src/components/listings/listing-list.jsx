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
    <ul className="space-y-4">
      {listings.map((listing) => (
        <li
          key={listing.id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md"
        >
          <h2 className="text-lg font-semibold">{listing.title}</h2>
          <p className="text-sm text-gray-600 mb-1">
            Category: {listing.category}
          </p>
          <p className="text-sm text-gray-600 mb-1">Price: {listing.price}</p>
          <p className="text-sm">{listing.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default ListingList;
