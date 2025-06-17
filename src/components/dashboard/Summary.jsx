import { getAuth } from 'firebase/auth';
import useUserListings from '../../hooks/useUserListings';
import errorHandler from '../../utils/error/errorHandler';
import ListingPanelCard from './ListingPanelCard';
import AnalyticsPanel from './AnalyticsPanel';
import useListingStore from '../../stores/useListingStore';
import EditListingView from './EditListingView';

const Summary = ({ currentUser }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const { listings, loading, error } = useUserListings(user?.uid);
  const { isEditModalOpen, setIsEditModalOpen } = useListingStore();

  const formattedCreatedAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(user?.metadata?.creationTime));

  const SummaryHeader = () => (
    <div className="summary-header flex flex-col">
      <span className="text-xl md:text-2xl font-bold">Summary</span>
      <span className="text-sm text-gray-500">
        Account Created: {formattedCreatedAt}
      </span>
    </div>
  );

  const SummaryPanel = () => (
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
        ) : listings.length === 0 ? (
          <div className="text-sm text-gray-500 italic">
            You haven’t created any listings yet.
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

  return (
    <div className="flex flex-col gap-4 overflow-x-hidden overflow-y-auto p-8">
      <SummaryHeader />
      <SummaryPanel />
      <EditListingView />
    </div>
  );
};

export default Summary;
