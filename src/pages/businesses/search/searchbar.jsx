import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import debounce from 'lodash.debounce';
import SearchDropdown from './search-dropdown';
import { fetchAllListings } from '../../../utils/firestore/listings';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allListings, setAllListings] = useState([]);
  const [results, setResults] = useState([]);

  // Load all listings once
  useEffect(() => {
    const loadListings = async () => {
      const data = await fetchAllListings();
      setAllListings(data);
    };
    loadListings();
  }, []);

  // Debounced fuzzy search
  useEffect(() => {
    const handler = debounce(() => {
      const trimmed = searchTerm.trim();

      // Only search if input has at least 3 characters
      if (trimmed.length < 3) {
        setResults([]);
        return;
      }

      const fuse = new Fuse(allListings, {
        keys: ['title', 'description', 'keywords', 'category'],
        threshold: 0.3,
        includeScore: true,
      });

      const searchResults = fuse.search(trimmed).map((r) => r.item);
      setResults(searchResults);
    }, 300);

    handler();
    return () => handler.cancel();
  }, [searchTerm, allListings]);

  return (
    <div className="relative w-full md:w-1/2 mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for services"
        className="input w-full bg-slate-50 text-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline"
      />
      <SearchDropdown results={results} />
    </div>
  );
};

export default SearchBar;
