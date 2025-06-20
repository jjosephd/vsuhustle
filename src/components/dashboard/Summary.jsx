import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import useUserListings from '../../hooks/useUserListings';
import useListingStore from '../../stores/useListingStore';
import EditListingView from './EditListingView';
import SummaryPanel from './SummaryPanel';

const Summary = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const {
    listings: fetchedListings,
    loading,
    error,
  } = useUserListings(currentUser?.uid);

  const { setListings } = useListingStore();

  // Sync fetched listings into Zustand
  useEffect(() => {
    if (!loading && fetchedListings?.length >= 0) {
      setListings(fetchedListings);
    }
  }, [fetchedListings, loading, setListings]);

  const formattedCreatedAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(currentUser?.metadata?.creationTime));

  const SummaryHeader = () => (
    <div className="summary-header flex flex-col">
      <span className="text-xl md:text-2xl font-bold">Summary</span>
      <span className="text-sm text-gray-500">
        Account Created: {formattedCreatedAt}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 overflow-x-hidden overflow-y-auto p-8">
      <EditListingView />
      <SummaryHeader />
      <SummaryPanel
        currentUser={currentUser}
        listings={fetchedListings}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Summary;
