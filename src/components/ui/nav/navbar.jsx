import React from 'react';
import { useAuth } from '../../../context/auth/AuthContext';
import LogoutButton from '../../buttons/logout';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router';
import { LuCalendarSearch } from 'react-icons/lu';

const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <nav className="w-full">
      <div className=" navbar flex absolute top-0 left-0 right-0 z-30 bg-transparent justify-between px-4 text-white font-bold ">
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
                <Link
                  to="/login"
                  className="btn btn-primary btn-sm border-0 rounded-full text-xs px-8 text-white"
                >
                  <LuCalendarSearch />
                  Browse Providers
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
