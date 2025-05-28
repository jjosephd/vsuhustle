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
      {results.map((listing) => (
        <div key={listing.id} className="py-2 cursor-pointer">
          <div className="flex flex-col mb-4">
            {renderDropdownItem('Businesses', listing.title, () =>
              navigate(`/listings/${listing.id}`)
            )}
          </div>
          <div className="flex flex-col">
            {renderDropdownItem('Categories', listing.category, () =>
              navigate(`/category/${listing.category}`)
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchDropdown;
