import React from 'react';
import { FaEdit } from 'react-icons/fa';
import useListingStore from '../../stores/useListingStore';
import EditListingForm from './EditListingForm';

const EditListingView = () => {
  const {
    isEditModalOpen,
    setIsEditModalOpen,
    currentListing,
    clearCurrentListing,
  } = useListingStore();

  const closeModal = () => {
    if (currentListing) {
      const confirmExit = window.confirm(
        'Are you sure you want to exit without saving changes?'
      );
      if (!confirmExit) return;
    }

    setIsEditModalOpen(false);
    clearCurrentListing();
  };

  if (!isEditModalOpen) return null;

  return (
    <dialog id="edit-listing-modal" className="modal" open>
      <div className="modal-box max-w-xl">
        <form method="dialog">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            x
          </button>
        </form>

        {!currentListing ? (
          <p>Loading...</p>
        ) : (
          <>
            <h3 className="font-bold text-lg mb-2">Edit Listing</h3>
            <p className="mb-4 text-sm text-gray-500">{currentListing.title}</p>
            <EditListingForm />
          </>
        )}
      </div>
    </dialog>
  );
};

export default EditListingView;
