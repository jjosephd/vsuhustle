import ListingCard from './listing-card';
const Grid = ({ listings }) => (
  <ul className="flex flex-wrap gap-4 py-12">
    {listings.map((listing) => (
      <ListingCard key={listing.id} {...listing} />
    ))}
  </ul>
);

export default Grid;
