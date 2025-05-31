import React from 'react';
import ServicesCard from './services-card';
import { MdPersonSearch } from 'react-icons/md';
import { LuPartyPopper } from 'react-icons/lu';
import { MdDashboardCustomize } from 'react-icons/md';
import { PiShareNetworkBold } from 'react-icons/pi';

const cardData = [
  {
    id: 1,
    img: <MdPersonSearch />,
    title: ' Find Local Student Providers',
    body: 'Browse or search for services offered by fellow VSU students — from haircuts to tutoring and more.',
  },
  {
    id: 2,
    img: <LuPartyPopper />,
    title: 'Promote Your Hustle',
    body: 'Showcase your skills and services to potential customers and expand your reach.',
  },
  {
    id: 3,
    img: <MdDashboardCustomize />,
    title: 'Manage Services in Your Personal Dashboard',
    body: 'Track your listings, update details, respond to inquiries, and organize your side gigs in one place.',
  },
  {
    id: 4,
    img: <PiShareNetworkBold />,
    title: 'Grow Your Network',
    body: 'Access a larger community of VSU students who share your passions and skills.',
  },
];
const Services = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-6 pb-6">
      <header className="mb-12 flex flex-col items-center">
        <h1>Our Services</h1>
        <h2 className="text-2xl uppercase font-extrabold">
          What we are offering
        </h2>
      </header>
      <div className="card-container flex flex-wrap justify-center gap-12 sm:gap-6 mt-10">
        {cardData.map((card) => (
          <ServicesCard key={card.id} cardData={card} />
        ))}
      </div>
    </div>
  );
};

export default Services;
