import { useEffect, useState } from 'react';
import campusBackgroundImage from '../../../assets/images/campus-bg.jpg';
import HeroNav from '../nav/hero-nav';
import SearchBar from '../search/searchbar';
import { fetchListingsByCategory } from '../../../utils/firestore/listings';
import { fetchListingsByKeyword } from '../../../utils/firestore/listings';

const BusinessesHero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setSearchResults([]);
      return;
    }

    fetchListingsByKeyword(searchTerm).then(setSearchResults);
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
        <SearchBar />
      </div>
      <nav className="absolute bottom-0 w-full z-10">
        <HeroNav />
      </nav>
    </section>
  );
};

export default BusinessesHero;
