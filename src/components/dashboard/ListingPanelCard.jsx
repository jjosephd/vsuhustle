import React from 'react';
import { Link } from 'react-router';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import useListingStore from '../../stores/useListingStore';
import EditListingView from './EditListingView';
const ListingPanelCard = ({ listing }) => {
  const { title, description, imageUrl, id } = listing;

  const { setCurrentListing, setIsEditModalOpen, currentListing } =
    useListingStore();
  return (
    <div className="card bg-base-100 w-full h-full shadow-sm">
      <figure className="h-48">
        <img
          src={imageUrl || 'https://placehold.co/600x400'}
          alt="listing image"
          className="object-contain w-full rounded-lg"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="button-container flex flex-wrap justify-end gap-1">
          <div className="card-actions justify-end">
            <Link to={`/listings/${id}`} className="btn btn-primary btn-sm">
              <FaExternalLinkAlt />
            </Link>
          </div>
          <div className="card-actions">
            <div
              className="btn btn-primary btn-sm"
              onClick={() => {
                setCurrentListing(listing);
                setIsEditModalOpen(true);
              }}
            >
              <FaEdit />
            </div>
          </div>
          <div className="card-actions">
            <button className="btn btn-primary btn-sm">
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPanelCard;
