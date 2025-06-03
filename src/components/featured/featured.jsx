import React, { useRef, useEffect, useState } from 'react';
import ListingList from '../listings/listing-list';
import { FaCircleArrowRight, FaCircleArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import { fetchListingById } from '../../utils/firestore/listings';

const Featured = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full p-8 md:p-24">
      <h1 className="text-xl font-medium mb-4">Featured</h1>

      <div className="relative">
        {/* Scrollable featured listings */}
        <div
          ref={scrollRef}
          className="featured-listings flex overflow-x-scroll scroll-smooth snap-x snap-mandatory gap-4 mx-auto"
        >
          <ListingList />
        </div>

        {/* Left arrow */}
        <button
          onClick={scrollLeft}
          className="absolute -left-10 top-1/2 -translate-y-1/2 z-20 text-6xl text-white hover:cursor-pointer px-2  rounded-full border-0"
        >
          <FaCircleArrowLeft className="bg-black rounded-full border-0" />
        </button>

        {/* Right arrow */}
        <button
          onClick={scrollRight}
          className="absolute -right-10 top-1/2 -translate-y-1/2 z-20 text-6xl text-white hover:cursor-pointer px-2  rounded-full border-0 "
        >
          <FaCircleArrowRight className="bg-black rounded-full border-0" />
        </button>
      </div>
    </div>
  );
};

export default Featured;
