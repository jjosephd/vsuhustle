import React from 'react';
import Hero from '../components/hero/hero';

const Home = () => {
  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
      <section id="hero">
        <Hero />
      </section>
    </div>
  );
};

export default Home;
