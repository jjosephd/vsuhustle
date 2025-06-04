import ListingCard from './listing-card';
const Grid = ({ listings }) => (
  <ul className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4 py-12">
    {listings.map((listing) => (
      <ListingCard key={listing.id} {...listing} />
    ))}
  </ul>
);

export default Grid;
