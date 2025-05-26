import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './ui/navbar';

const Layout = () => {
  return (
    <div className="min-h-screen w-full">
      <header></header>
      <main></main>
      <Outlet />
    </div>
  );
};

export default Layout;
