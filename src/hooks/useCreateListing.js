// hooks/useCreateListing.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createListing } from '../utils/firestore/listings';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const useCreateListing = ({ onSuccessCallback }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ listingData, userId }) => createListing({ listingData, userId }),
    onSuccess: (id) => {
      toast.success('Your listing has been successfully created.', {
        position: 'top-center',
        autoClose: 5000,
      });
      queryClient.invalidateQueries(['listings']);
      onSuccessCallback?.();
      setTimeout(() => navigate('/dashboard/listings'), 5000);
    },
    onError: () => {
      toast.error('Something went wrong while saving your listing.');
    },
  });
};

export default useCreateListing;
