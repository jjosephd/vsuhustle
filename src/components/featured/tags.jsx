import { titleCase } from '../../utils/misc/stringUtils';
export const FeaturedTag = () => (
  <div className="bg-success rounded px-3 py-1 text-xs font-bold text-white ">
    <div className="flex items-center">Featured</div>
  </div>
);
export default FeaturedTag;

export const CategoryTag = ({ category }) => (
  <div className="bg-secondary rounded px-3 py-1 text-xs font-bold text-white">
    {titleCase(category)}
  </div>
);

export const ScoreTag = ({ rating }) => {
  if (rating === null) {
    return (
      <div className="bg-primary rounded px-3 py-1 text-xs font-bold text-white">
        No Reviews
      </div>
    );
  }
  return (
    <div className="bg-gray-600/40 rounded px-3 py-1 text-xs font-bold text-white">
      {rating} Rating
    </div>
  );
};
