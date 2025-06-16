import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchListingsByUserId } from '../utils/firestore/listings';

const useUserListings = (userId) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ['listings', userId],
    queryFn: () => fetchListingsByUserId(userId),
    enabled: !!userId,
    keepPreviousData: true,
  });

  return { listings: data, loading: isLoading, error };
};

export default useUserListings;