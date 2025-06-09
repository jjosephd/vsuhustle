import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import {
  fetchListingById,
  fetchListingsByUserId,
} from '../../utils/firestore/listings';
import errorHandler from '../../utils/error/errorHandler';
import ListingPanelCard from './ListingPanelCard';
import AnalyticsPanel from './AnalyticsPanel';
const Summary = ({ currentUser, id }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  const createdAt = user.metadata.creationTime;

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listings = await fetchListingsByUserId(user.uid);
        setListings(listings);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const formattedCreatedAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(createdAt));

  const SummaryHeader = () => {
    return (
      <div className="summary-header flex flex-col">
        <span className="text-xl md:text-2xl font-bold">Summary</span>
        <span className="text-sm text-gray-500">
          Account Created: {formattedCreatedAt}
        </span>
      </div>
    );
  };

  const SummaryPanel = () => {
    return (
      <>
        {/* Bookings */}
        <section id="bookings">Current Bookings</section>
        {/* My Listings */}
        <section id="my-listings">
          <h1 className="text-2xl">My Listings</h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{errorHandler(error)}</div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {listings.map((listing) => (
                <li key={listing.id} className="p-1">
                  <ListingPanelCard
                    listing={listing}
                    currentUser={currentUser}
                    className="w-full"
                  />
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Analytics */}
        <section id="my-analytics">
          <h1 className="text-2xl">Analytics</h1>
          <AnalyticsPanel />
        </section>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-4 overflow-x-hidden overflow-y-auto p-8">
      <SummaryHeader />
      <SummaryPanel />
    </div>
  );
};

export default Summary;
