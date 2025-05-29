import React from 'react';
import heroImg from '../../assets/images/hero-img.jpg';
import heroTrainer from '../../assets/images/hero-trainer.jpg';
import { Link } from 'react-router';
import { useAuth } from '../../context/auth/AuthContext';

const Hero = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen w-full pt-24">
      <div className="flex flex-col justify-center sm:grid sm:grid-cols-2 place-items-center px-6 w-full h-full">
        <div className="left-col">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">
            Turn your skills into side income — right here on campus.
          </h1>
          <p className=" max-w-xl">
            VSU Hustle is your student-to-student service marketplace for
            haircuts, tutoring, design work, and more. Discover local talent,
            promote your hustle, or book a fellow Trojan — all in one place.
          </p>
          <div className="flex gap-4 mt-4 justify-center items-center sm:justify-start">
            <Link to="/businesses">
              <button className="btn btn-lg btn-primary">Find a Service</button>
            </Link>
            {user ? (
              <Link to="/businesses">
                <button className="btn btn-lg btn-secondary">
                  Start Earning
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="btn btn-lg btn-secondary">
                  Start Earning
                </button>
              </Link>
            )}
          </div>
        </div>
        <div className="right-col hidden sm:flex sm:flex-row gap-2">
          <img
            src={heroTrainer}
            alt="hero-trainer"
            className="rounded-xl min-h-[400px] sm:max-h-[750px] sm:w-1/2 object-cover sm:relative sm:top-20"
          />
          <img
            src={heroImg}
            alt="hero-img"
            className="rounded-xl sm:max-h-[750px] sm:w-1/2 object-cover "
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
