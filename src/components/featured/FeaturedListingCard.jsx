import React from 'react';
import FeaturedTag, { CategoryTag } from './tags';
import useAllListings from '../../hooks/useAllListings';

const FeaturedListingCard = ({ listing }) => {
  const { title, category, description, imageUrl, createdAt, featured } =
    useAllListings();
  return (
    <div>
      <img
        src={imageUrl}
        alt={title}
        className="h-50 w-full object-cover mb-2 rounded-xl"
        loading="lazy"
      />
      <h2 className="text-sm font-semibold">{title}</h2>

      <p className="text-xs">{description}</p>
      <div className="tag-container flex items-center gap-1 py-1">
        <CategoryTag category={category} />
        {featured && <FeaturedTag />}
      </div>
      <p className="text-xs text-gray-500">
        Postedd: {new Date(createdAt?.toDate()).toLocaleString()}
      </p>
    </div>
  );
};

export default FeaturedListingCard;
