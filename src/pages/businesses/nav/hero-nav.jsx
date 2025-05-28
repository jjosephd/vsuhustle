import React from 'react';
import { navLinks } from './nav-links';
import { NavLink } from 'react-router';

const HeroNav = () => {
  return (
    <div className="px-4 py-6 overflow-x-auto">
      <ul className="flex gap-6 sm:justify-between text-white font-bold text-sm whitespace-nowrap min-w-max">
        {navLinks.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.href}
              className={
                'p-2 hover:border-b-2 transition-all ease-in duration-100'
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeroNav;
