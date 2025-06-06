import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchListingsByCategory } from '../../utils/firestore/listings';
import errorHandler from '../../utils/error/errorHandler';
import { MdSort } from 'react-icons/md';
import Grid from '../../components/listings/category/grid';

const CategoryPage = () => {
  const { category } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [listings, setListings] = useState([]);
  const [originalListings, setOriginalListings] = useState([]);

  const [showFilters, setShowFilters] = useState(false);
  const [sortByName, setSortByName] = useState(false);

  // Fetch listings by category on initial render
  useEffect(() => {
    if (!category) {
      setError('Category does not exist');
      setLoading(false);
      return;
    }

    const fetchListings = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedListings = await fetchListingsByCategory(category);
        setListings(fetchedListings);
        setOriginalListings(fetchedListings);
      } catch (err) {
        errorHandler.general(err, 'Error fetching listings');
        setError(err.message || 'Failed to fetch listings');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [category]);

  // Reapply name sort if toggled
  useEffect(() => {
    if (sortByName) {
      const sorted = [...listings].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setListings(sorted);
    } else {
      setListings(originalListings);
    }
  }, [sortByName]);

  const toggleFilters = () => setShowFilters((prev) => !prev);

  const resetFilters = () => {
    setSortByName(false);
    setListings(originalListings);
  };

  if (loading) {
    return (
      <div className="p-8">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="p-8">
        <p>No listings found.</p>
      </div>
    );
  }

  function FilterOptions({ sortByName, setSortByName, resetFilters }) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 mb-6 bg-base-100 max-w-xs">
        <div className="container flex justify-between">
          <label className="text-sm font-medium  items-center gap-2">
            Sort by name (A–Z)
          </label>
          <input
            type="checkbox"
            className="checkbox"
            checked={sortByName}
            onChange={(e) => setSortByName(e.target.checked)}
          />
        </div>

        <button
          onClick={resetFilters}
          className="text-sm text-secondary hover:underline"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Filter Toggle Button */}
      <button
        className="btn btn-outline flex items-center gap-2 mb-2"
        onClick={toggleFilters}
      >
        <MdSort />
        Filters
      </button>

      {/* Filter Options Panel */}

      {showFilters && (
        <FilterOptions
          sortByName={sortByName}
          setSortByName={setSortByName}
          resetFilters={resetFilters}
        />
      )}

      {/* ... */}

      {/* Category Heading */}
      <h1 className="text-2xl font-bold mb-4 capitalize pt-4 px-1">
        {category} Services
      </h1>

      {/* Listings Grid */}
      <Grid listings={listings} />
    </div>
  );
};

export default CategoryPage;
