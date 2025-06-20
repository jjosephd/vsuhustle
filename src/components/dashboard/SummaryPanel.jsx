// SummaryPanel.jsx
import { Link } from 'react-router';
import { useEffect } from 'react';
import errorHandler from '../../utils/error/errorHandler';
import ListingPanelCard from './ListingPanelCard';
import AnalyticsPanel from './AnalyticsPanel';
import BookingCalendar from './BookingCalendar';
import useListingStore from '../../stores/useListingStore';
import useUserBookings from '../../hooks/useUserBookings';

const SummaryPanel = ({ currentUser, listings = [], loading, error }) => {
  const {
    bookings: fetchedBookings,
    loading: bookingsLoading,
    error: bookingsError,
  } = useUserBookings(currentUser?.uid);

  const { setBookings } = useListingStore();

  // Sync fetched bookings into Zustand
  useEffect(() => {
    if (!bookingsLoading && fetchedBookings?.length >= 0) {
      setBookings(fetchedBookings);
    }
  }, [fetchedBookings, bookingsLoading, setBookings]);

  const listingsJSX = listings.map((listing) => (
    <li key={listing.id} className="p-1">
      <ListingPanelCard
        listing={listing}
        user={currentUser}
        className="w-full"
      />
    </li>
  ));

  return (
    <>
      {/* Bookings */}
      <section id="bookings">
        <h1 className="text-2xl">Current Bookings</h1>
        <BookingCalendar
          bookings={fetchedBookings}
          loading={bookingsLoading}
          error={bookingsError}
        />
      </section>

      {/* Listings */}
      <section id="my-listings">
        <h1 className="text-2xl mt-6">My Listings</h1>
        {loading ? (
          <div>Loading listings...</div>
        ) : error ? (
          <div>{errorHandler.firebase(error)}</div>
        ) : listings.length === 0 ? (
          <div className="text-sm text-gray-500 italic">
            You haven&rsquo;t created any listings yet.
            <br />
            <Link
              to="/businesses/new-listing"
              className="text-blue-500 underline"
            >
              Create your first listing
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {listingsJSX}
          </ul>
        )}
      </section>

      {/* Analytics */}
      <section id="my-analytics" className="mt-6">
        <h1 className="text-2xl">Analytics</h1>
        <AnalyticsPanel />
      </section>
    </>
  );
};

export default SummaryPanel;
