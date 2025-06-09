import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../context/auth/AuthContext';
import { Link as ScrollLink } from 'react-scroll';

import Summary from '../../components/dashboard/Summary';

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
    <div className=" min-h-screen">
      <div className="flex flex-col md:flex-row bg-base-200">
        {/* Mobile Header / Desktop Sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4  md:fixed md:h-screen ">
          <div className="flex flex-row md:flex-col items-center md:items-start p-4 gap-4">
            {/* Profile Image */}
            <div className="w-16 h-16 md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] flex-shrink-0 overflow-hidden rounded-lg">
              <img
                src="https://placehold.co/600x400"
                alt="profile image"
                aria-label="profile image"
                className="object-cover w-full h-full"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 md:w-full text-left md:text-center lg:text-left">
              <div className="text-lg md:text-xl lg:text-2xl font-semibold truncate">
                Username
              </div>
              <div className="text-sm md:text-base text-gray-600 truncate">
                {currentUser.email}
              </div>
            </div>

            <div className="md:hidden">
              {/* Add hamburger menu button here if needed */}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-4 pb-4 md:py-8">
            <div className="flex flex-row md:flex-col gap-2 md:gap-0 overflow-x-auto md:overflow-x-visible">
              {navLinks.map((link, index) => (
                <ScrollLink
                  key={index}
                  to={link.to}
                  spy={link.spy}
                  smooth={link.smooth}
                  duration={link.duration}
                  containerId="dashboard-scroll-container"
                  offset={-100}
                  className="flex-shrink-0 md:flex-shrink font-semibold text-sm md:text-base lg:text-lg py-2 px-3 md:px-0 hover:cursor-pointer transition-all ease-in duration-200 text-center md:text-left whitespace-nowrap md:whitespace-normal hover:bg-base-300 md:hover:bg-transparent rounded md:rounded-none"
                >
                  {link.name}
                </ScrollLink>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:ml-[33.333%] lg:ml-[25%] min-h-screen">
          <div className="p-4 md:p-6">
            <div className="bg-white rounded-xl shadow-sm h-[calc(100vh-6rem)] overflow-hidden">
              {/* Scrollable inner content */}
              <div
                id="dashboard-scroll-container"
                className="h-full overflow-y-auto p-4 md:p-6"
              >
                <Summary user={currentUser} id={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
