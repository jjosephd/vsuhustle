import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Fuse from 'fuse.js';
import debounce from 'lodash.debounce';
import SearchDropdown from './search-dropdown';
import { fetchAllListings } from '../../../utils/firestore/listings';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const queryClient = useQueryClient();

  // Fetch and cache listings using React Query
  const {
    data: allListings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['listings'],
    queryFn: fetchAllListings,
    staleTime: 1000 * 60 * 5, // Optional: keep listings fresh for 5 min
  });

  // Debounced fuzzy search
  useEffect(() => {
    const handler = debounce(() => {
      const trimmed = searchTerm.trim();

      if (trimmed.length < 3) {
        setResults([]);
        return;
      }

      const fuse = new Fuse(allListings, {
        keys: ['title', 'keywords'],
        threshold: 0.2,
        distance: 100,
        includeScore: true,
      });

      const searchResults = fuse
        .search(trimmed)
        .filter(
          (r) => r.score !== null && r.score !== undefined && r.score < 0.3
        )
        .map((r) => r.item);
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
