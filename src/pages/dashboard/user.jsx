import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../context/auth/AuthContext';
import { Link as ScrollLink } from 'react-scroll';

import SummarySection from '../../components/dashboard/SummarySection';

const User = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser?.uid !== id) {
      window.location.href = '/';
    }
  }, [currentUser, id]);

  const navLinks = [
    {
      name: 'My Listings',
      to: 'my-listings',
      spy: true,
      smooth: true,
      duration: 500,
    },
    {
      name: 'Bookings',
      to: 'bookings',
      spy: true,
      smooth: true,
      duration: 500,
    },
    {
      name: 'Settings',
      to: 'settings',
      spy: true,
      smooth: true,
      duration: 500,
    },
    { name: 'Reviews', to: 'reviews', spy: true, smooth: true, duration: 500 },
    {
      name: 'Analytics',
      to: 'analytics',
      spy: true,
      smooth: true,
      duration: 500,
    },
  ];

  return (
    <div className="pt-24 h-[calc(100vh-6rem)]">
      {' '}
      {/* full height minus nav/header */}
      <div className="flex">
        {/* Fixed Sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-base-200 p-4 md:fixed md:h-full overflow-y-auto">
          <div className="flex flex-col items-center md:items-start px-4">
            <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] overflow-hidden rounded-lg mb-4">
              <img
                src="https://placehold.co/600x400"
                alt="profile image"
                aria-label="profile image"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-center md:text-left w-full">
              <span className="text-xl md:text-2xl">Username</span>
              <br />
              <span className="text-sm md:text-base">{currentUser.email}</span>
            </div>
            <div className="py-8 w-full">
              {navLinks.map((link, index) => (
                <ScrollLink
                  key={index}
                  to={link.to}
                  spy={link.spy}
                  smooth={link.smooth}
                  duration={link.duration}
                  className="block font-bold text-base md:text-lg py-2 hover:cursor-pointer transition-all ease-in duration-100 text-center md:text-left"
                >
                  {link.name}
                </ScrollLink>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Content (SummarySection) */}
        <div className="w-full md:ml-[33.333%] lg:ml-[25%] overflow-y-auto h-full p-4">
          <div className="bg-white rounded-xl p-6 shadow-sm h-full">
            <SummarySection user={currentUser} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
