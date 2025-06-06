import React from 'react';
import { useNavigate } from 'react-router';
import { titleCase } from '../../../utils/misc/stringUtils';

const SearchDropdown = ({ results }) => {
  const navigate = useNavigate();

  if (!results.length) return null;

  const renderDropdownItem = (key, content, onClick) => (
    <div
      key={key}
      className="hover:bg-gray-100 hover:cursor-pointer w-full h-full px-4 py-2 flex flex-col"
    >
      <span className="font-semibold text-gray-600" onClick={onClick}>
        {titleCase(content)}
      </span>
    </div>
  );

  return (
    <div className="absolute mt-2 w-full bg-white text-left text-black rounded shadow-lg z-50 max-h-60 overflow-y-auto pb-4">
      {/* Businesses */}
      {results.length > 0 && (
        <div className="flex flex-col mb-4">
          <span className="px-4 pt-2 text-sm text-gray-500 font-medium mb-1">
            Businesses
          </span>
          {results.map((listing) => (
            <div
              key={`business-${listing.id}`}
              className="py-2 px-4 cursor-pointer hover:bg-gray-100 flex flex-col"
              onClick={() => navigate(`/listings/${listing.id}`)}
            >
              <div className="flex items-center">
                <img
                  src={listing.imageUrl}
                  alt={listing.title}
                  className="w-8 h-8 rounded-md mr-2"
                />
                <span className="text-base font-semibold text-gray-700 ">
                  {listing.title}
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-500 px-10">
                Uploaded on: {listing.createdAt?.toDate().toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Unique Categories */}
      {results.length > 0 && (
        <div className="flex flex-col">
          <span className="px-4 py-2 text-sm text-gray-500 font-medium pt-2">
            Categories
          </span>
          {[...new Set(results.map((l) => l.category))].map((category) =>
            renderDropdownItem(`category-${category}`, category, () =>
              navigate(`/category/${category}`)
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
