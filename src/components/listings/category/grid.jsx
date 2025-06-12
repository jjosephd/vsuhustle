import FeaturedListingCard from './ListingCard';
const Grid = ({ listings }) => (
  <ul className="flex flex-wrap gap-4 py-12">
    {listings.map((listing) => (
      <FeaturedListingCard key={listing.id} {...listing} />
    ))}
  </ul>
);

export default Grid;
