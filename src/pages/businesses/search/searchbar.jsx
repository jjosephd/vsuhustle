import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Fuse from 'fuse.js';
import debounce from 'lodash.debounce';
import SearchDropdown from './search-dropdown';
import { fetchAllListings } from '../../../utils/firestore/listings';
import useListingStore from '../../../stores/useListingStore';
import { MdClear } from 'react-icons/md';

const SearchBar = () => {
  const {
    searchTerm,
    setSearchTerm,
    setSearchResults,
    searchResults,
    resetSearch,
  } = useListingStore();
  const { data: allListings = [] } = useQuery({
    queryKey: ['listings'],
    queryFn: fetchAllListings,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const handler = debounce(() => {
      const trimmed = searchTerm.trim();

      if (trimmed.length < 3) {
        setSearchResults([]);
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

      setSearchResults(searchResults);
    }, 300);

    handler();
    return () => handler.cancel();
  }, [searchTerm, allListings]);

  return (
    <div className="relative w-full md:w-1/2 mx-auto">
      <div className=" flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for services"
          className="input w-full bg-slate-50 text-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline"
        />
        <button
          onClick={resetSearch}
          className="absolute z-30 right-4 top-1/2 transform -translate-y-1/2 text-gray-600/50 bg-gray-400/10 rounded-full px-2 py-1 text-xs hover:text-gray-800 hover:cursor-pointer"
        >
          Clear
        </button>
      </div>

      <SearchDropdown results={searchResults} />
    </div>
  );
};

export default SearchBar;
