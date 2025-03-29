import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import supabase from '../supabaseClient';
import StarRating from './StarRating';

interface Feedback {
  id: number;
  name: string;
  email: string;
  phone: string;
  overall_rating: number;
  enjoyed_most: string;
  food_quality: number;
  service_quality: number;
  improvements: string;
  additional_comments: string;
  created_at: string;
}

const FeedbackList = () => {
  const { t } = useTranslation();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const { data, error } = await supabase
        .from('feedbacks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setFeedbacks(data || []);
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
      setError('Failed to load feedbacks');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        {error}
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        No feedbacks yet
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {feedbacks.map((feedback) => (
        <div key={feedback.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{feedback.name}</h3>
              <p className="text-sm text-gray-500">{feedback.email}</p>
              {feedback.phone && (
                <p className="text-sm text-gray-500">{feedback.phone}</p>
              )}
            </div>
            <span className="text-sm text-gray-500">
              {new Date(feedback.created_at).toLocaleDateString()}
            </span>
          </div>

          <div className="space-y-4">
            {/* Overall Rating */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                {t('overallExperience')}
              </h4>
              <StarRating rating={feedback.overall_rating} readOnly />
            </div>

            {/* Food Quality */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                {t('foodQuality')}
              </h4>
              <StarRating rating={feedback.food_quality} readOnly />
            </div>

            {/* Service Quality */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                {t('serviceQuality')}
              </h4>
              <StarRating rating={feedback.service_quality} readOnly />
            </div>

            {/* Enjoyed Most */}
            {feedback.enjoyed_most && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  {t('enjoyedMost')}
                </h4>
                <p className="text-gray-600">{feedback.enjoyed_most}</p>
              </div>
            )}

            {/* Improvements */}
            {feedback.improvements && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  {t('improvements')}
                </h4>
                <p className="text-gray-600">{feedback.improvements}</p>
              </div>
            )}

            {/* Additional Comments */}
            {feedback.additional_comments && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  {t('additionalComments')}
                </h4>
                <p className="text-gray-600">{feedback.additional_comments}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList; 