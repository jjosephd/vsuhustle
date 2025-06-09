import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './ui/nav/navbar';
import Home from '../pages/home';
import { useLocation } from 'react-router';

const Layout = () => {
  return (
    <div
      className="w-screen flex flex-col overflow-x-hidden"
      data-theme="maintheme"
    >
      <header>
        <Navbar />
      </header>
      <main
        className={useLocation().pathname === '/businesses' ? 'pt-0' : 'pt-16'}
      >
        {' '}
      </main>
      <Outlet />
    </div>
  );
};

export default Layout;
