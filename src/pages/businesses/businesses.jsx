import React from 'react';
import Hero from './hero/businesses-hero';
import BusinessesHero from './hero/businesses-hero';
import Featured from '../../components/featured/featured';

const Businesses = () => {
  return (
    <div>
      <section>
        <BusinessesHero />
      </section>
      <section>
        <Featured />
      </section>
    </div>
  );
};

export default Businesses;
