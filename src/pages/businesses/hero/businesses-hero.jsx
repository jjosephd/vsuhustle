import React from 'react';
import campusBackgroundImage from '../../../assets/images/campus-bg.jpg';
import HeroNav from '../nav/hero-nav';

const BusinessesHero = () => {
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
        <input
          type="text"
          placeholder="Search for services"
          className="input w-full text-gray-800 md:w-1/2 px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline focus:border-0"
        />
      </div>
      <nav className="absolute bottom-0 w-full z-50">
        <HeroNav />
      </nav>
    </section>
  );
};

export default BusinessesHero;
