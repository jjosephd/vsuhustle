import { useQuery } from '@tanstack/react-query';
import { fetchListingById } from '../utils/firestore/listings';
import { fetchReviewsForListing } from '../utils/firestore/reviews';

const useListingDetail = (id) => {
  const {
    data: listing,
    isLoading: listingLoading,
    error: listingError
  } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => fetchListingById(id),
    enabled: !!id
  });

  const {
    data: reviews,
    isLoading: reviewsLoading,
    error: reviewsError
  } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => fetchReviewsForListing(id),
    enabled: !!id
  });

  return {
    listing,
    reviews,
    loading: listingLoading || reviewsLoading,
    error: listingError,
    reviewsError,
  };
};

export default useListingDetail;
