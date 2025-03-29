import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StarRating from './StarRating';

interface ReviewFormProps {
  onSubmit: (rating: number) => void;
}

const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmit(rating);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {t('rateExperience')}
        </h2>
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>
      
      <button
        type="submit"
        disabled={rating === 0}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {t('submitReview')}
      </button>
    </form>
  );
};

export default ReviewForm; 