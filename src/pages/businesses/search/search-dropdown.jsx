import React from 'react';
import { useNavigate } from 'react-router';

const SearchDropdown = ({ results }) => {
  const navigate = useNavigate();

  if (!results.length) return null;

  return (
    <div className="absolute mt-2 w-full bg-white text-left text-black rounded shadow-lg z-50 max-h-60 overflow-y-auto pb-4">
      {results.map((listing) => (
        <div
          key={listing.id}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {/* Business link */}
          <div className="flex flex-col mb-4">
            <h1 className="text-gray-500 text-sm">Businesses</h1>
            <span
              className="font-semibold hover:underline"
              onClick={() => navigate(`/listings/${listing.id}`)}
            >
              {listing.title}
            </span>
            <span className="text-xs text-gray-600">{listing.category}</span>
          </div>

          {/* Category link */}
          <div className="flex flex-col">
            <h1 className="text-gray-500 text-sm">Categories</h1>
            <span
              className="font-semibold text-gray-600 hover:underline"
              onClick={() => navigate(`/category/${listing.category}`)}
            >
              {listing.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchDropdown;
