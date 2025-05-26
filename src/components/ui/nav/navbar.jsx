import React from 'react';
import { useAuth } from '../../../context/auth/AuthContext';
import LogoutButton from '../../buttons/logout';
import { Link as ScrollLink } from 'react-scroll';
import { LuCalendarSearch } from 'react-icons/lu';

const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <nav className="w-full">
      <div className="navbar flex justify-between px-4 ">
        {currentUser ? (
          <>
            {currentUser.email}
            <LogoutButton />
          </>
        ) : (
          <>
            <div className="logo-container  font-extrabold text-3xl">
              VSUHustle
            </div>
            <ul className="links-container flex gap-6 items-center uppercase text-xs">
              <li>
                <ScrollLink
                  to="services"
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  Services
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="/" spy={true} smooth={true} duration={500}>
                  About
                </ScrollLink>
              </li>
              <li className="hidden sm:block">
                <ScrollLink
                  to="/listings"
                  spy={true}
                  smooth={true}
                  duration={500}
                  className="btn btn-primary btn-sm border-0 rounded-full text-xs px-8 text-white"
                >
                  <LuCalendarSearch />
                  Browse Providers
                </ScrollLink>
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
