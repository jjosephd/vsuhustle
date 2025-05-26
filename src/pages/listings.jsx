import React from 'react';
import LogoutButton from '../components/buttons/logout';
import ListingList from '../components/listings/listing-list';

const Listings = () => {
  return (
    <div className="mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Listings</h1>
      </div>
      <ListingList />
    </div>
  );
};

export default Listings;
