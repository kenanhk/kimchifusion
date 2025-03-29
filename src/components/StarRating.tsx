import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
}

const StarRating = ({ rating, onRatingChange, readOnly = false }: StarRatingProps) => {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (value: number) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          className={`focus:outline-none ${!readOnly ? 'cursor-pointer' : 'cursor-default'}`}
          disabled={readOnly}
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
        >
          {star <= rating ? (
            <StarIcon className="h-8 w-8 text-yellow-400" />
          ) : (
            <StarOutlineIcon className="h-8 w-8 text-gray-300" />
          )}
        </button>
      ))}
    </div>
  );
};

export default StarRating; 