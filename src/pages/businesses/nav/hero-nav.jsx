import React from 'react';
import { navLinks } from './nav-links';
import { NavLink } from 'react-router';

const HeroNav = () => {
  return (
    <div className="px-16 py-8">
      <ul className="flex justify-between text-white font-bold text-sm">
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
