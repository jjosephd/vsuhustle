import React, { useState, useEffect } from 'react';
import { fetchListingsByKeyword } from '../../../utils/firestore/listings';
import SearchDropdown from './search-dropdown';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
    fetchListingsByKeyword(searchTerm).then(setSearchResults);
  }, [searchTerm]);

  return (
    <div className="relative w-full md:w-1/2 mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for services"
        className="input w-full bg-slate-50 text-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline"
      />
      <SearchDropdown results={searchResults} />
    </div>
  );
};

export default SearchBar;
