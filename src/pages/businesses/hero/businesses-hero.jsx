import { useEffect, useState } from 'react';
import campusBackgroundImage from '../../../assets/images/campus-bg.jpg';
import HeroNav from '../nav/hero-nav';
import { fetchListingsByCategory } from '../../../utils/firestore/listings';

const BusinessesHero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setSearchResults([]);
      return;
    }

    fetchListingsByCategory(searchTerm).then(setSearchResults);
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section
      className="relative h-[350px] md:h-[600px] bg-cover bg-center flex flex-col w-full items-center justify-center text-white text-center"
      style={{ backgroundImage: `url(${campusBackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-900/60 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Discover Services Near You
        </h1>
        <p className="text-md md:text-2xl mb-6 drop-shadow-md">
          Discover and book services from fellow VSU students near you
        </p>
        <div className="relative w-full md:w-1/2 mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search for services"
            className="input w-full bg-slate-50 text-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline"
          />

          {/* Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute mt-2 w-full bg-white text-left text-black rounded shadow-lg z-30 max-h-60 overflow-y-auto">
              {searchResults.map((listing) => (
                <div
                  key={listing.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <strong>{listing.title}</strong> – {listing.category}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <nav className="absolute bottom-0 w-full z-50">
        <HeroNav />
      </nav>
    </section>
  );
};

export default BusinessesHero;
