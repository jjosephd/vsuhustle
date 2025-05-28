import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './ui/nav/navbar';
import Home from '../pages/home';

const Layout = () => {
  return (
    <div
      className="w-screen flex flex-col overflow-x-hidden"
      data-theme="maintheme"
    >
      <header>
        <Navbar />
      </header>
      <main className="pt-36"> </main>
      <Outlet />
    </div>
  );
};

export default Layout;
