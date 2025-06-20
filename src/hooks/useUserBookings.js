import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchBookingsByUserId } from '../utils/firestore/bookings';

const useUserBookings = (userId) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ['bookings', userId],
    queryFn: () => fetchBookingsByUserId(userId),
    enabled: !!userId,
    keepPreviousData: true,
  });

  return { bookings: data, loading: isLoading, error };
};

export default useUserBookings;
