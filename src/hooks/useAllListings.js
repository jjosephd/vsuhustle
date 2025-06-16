// hooks/useAllListings.js
import { useQuery } from '@tanstack/react-query';
import { fetchAllListings } from '../utils/firestore/listings';

const useAllListings = () => {
  
  const {data: listings, isLoading: listingLoading, error: listingError} = useQuery({
    queryKey: ['listings'],
    queryFn: () => fetchAllListings(),
    keepPreviousData: true,
  });

  return {listings: listings, loading: listingLoading, error: listingError};

}

export default useAllListings;
