import React from 'react';
import { useNavigate } from 'react-router';

const SearchDropdown = ({ results }) => {
  const navigate = useNavigate();

  if (!results.length) return null;

  const renderDropdownItem = (title, content, onClick) => (
    <div className="hover:bg-gray-100 w-full h-full px-4 py-2 flex flex-col">
      <h1 className="text-gray-500 text-sm">{title}</h1>
      <span className="font-semibold text-gray-600" onClick={onClick}>
        {content}
      </span>
    </div>
  );

  return (
    <div className="absolute mt-2 w-full bg-white text-left text-black rounded shadow-lg z-50 max-h-60 overflow-y-auto pb-4">
      {/* Businesses */}
      {results.length > 0 && (
        <div className="flex flex-col mb-4">
          <span className="px-4 py-2 text-sm text-gray-500 font-medium mb-1">
            Businesses
          </span>
          {results.map((listing) => (
            <div
              key={`business-${listing.id}`}
              className="py-2 px-4 cursor-pointer hover:bg-gray-100"
              onClick={() => navigate(`/listings/${listing.id}`)}
            >
              <span className="text-base font-semibold text-gray-700">
                {listing.title}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Unique Categories */}
      {results.length > 0 && (
        <div className="flex flex-col">
          <span className="px-4 text-sm text-gray-500 font-medium mb-1">
            Categories
          </span>
          {[...new Set(results.map((l) => l.category))].map((category) => (
            <div
              key={`category-${category}`}
              className="py-2 px-4 cursor-pointer hover:bg-gray-100"
              onClick={() => navigate(`/category/${category}`)}
            >
              <span className="text-base font-semibold text-gray-700">
                {category}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
