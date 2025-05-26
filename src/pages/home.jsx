import React from 'react';
import Hero from '../components/hero/hero';
import Services from '../components/services/services';

const Home = () => {
  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
      <section id="hero">
        <Hero />
      </section>
      <section id="services">
        <Services />
      </section>
    </div>
  );
};

export default Home;
