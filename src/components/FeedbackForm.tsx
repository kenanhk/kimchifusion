import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import supabase from '../supabaseClient';

interface FeedbackFormData {
  name: string;
  phone: string;
  email: string;
  overallRating: number;
  enjoyedMost: string;
  foodQuality: number;
  serviceQuality: number;
  improvements: string;
  additionalComments: string;
}

const FeedbackForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    phone: '',
    email: '',
    overallRating: 0,
    enjoyedMost: '',
    foodQuality: 0,
    serviceQuality: 0,
    improvements: '',
    additionalComments: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Only validate name and email
    if (!formData.name.trim() || !formData.email.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('Submitting feedback data:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        overall_rating: formData.overallRating,
        enjoyed_most: formData.enjoyedMost,
        food_quality: formData.foodQuality,
        service_quality: formData.serviceQuality,
        improvements: formData.improvements,
        additional_comments: formData.additionalComments,
      });

      const { data, error } = await supabase
        .from('feedbacks')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            overall_rating: formData.overallRating,
            enjoyed_most: formData.enjoyedMost,
            food_quality: formData.foodQuality,
            service_quality: formData.serviceQuality,
            improvements: formData.improvements,
            additional_comments: formData.additionalComments,
          }
        ])
        .select('*');

      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }

      console.log('Successfully inserted feedback:', data);
      
      // Show success message
      alert('Thank you for your feedback!');
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        overallRating: 0,
        enjoyedMost: '',
        foodQuality: 0,
        serviceQuality: 0,
        improvements: '',
        additionalComments: '',
      });

      // Navigate back to home page
      navigate('/');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('There was an error submitting your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('feedbackTitle')}
        </h1>
        <p className="text-gray-600">
          {t('feedbackSubtitle')}
        </p>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t('personalInfo')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {t('name')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              aria-required="true"
              aria-label={t('name')}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {t('phoneNumber')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label={t('phoneNumber')}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t('email')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              aria-required="true"
              aria-label={t('email')}
            />
          </div>
        </div>
      </div>

      {/* Feedback Questions Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t('feedbackQuestions')}
        </h2>
        
        {/* Overall Experience Rating */}
        <div className="space-y-4">
          <label htmlFor="overallRating" className="block text-sm font-medium text-gray-700">
            {t('overallExperience')}
          </label>
          <div id="overallRating" role="radiogroup" aria-label={t('overallExperience')}>
            <StarRating
              rating={formData.overallRating}
              onRatingChange={(rating) => setFormData(prev => ({ ...prev, overallRating: rating }))}
            />
          </div>
        </div>

        {/* Enjoyed Most */}
        <div>
          <label htmlFor="enjoyedMost" className="block text-sm font-medium text-gray-700 mb-1">
            {t('enjoyedMost')}
          </label>
          <textarea
            id="enjoyedMost"
            name="enjoyedMost"
            value={formData.enjoyedMost}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label={t('enjoyedMost')}
          />
        </div>

        {/* Food Quality Rating */}
        <div className="space-y-4">
          <label htmlFor="foodQuality" className="block text-sm font-medium text-gray-700">
            {t('foodQuality')}
          </label>
          <div id="foodQuality" role="radiogroup" aria-label={t('foodQuality')}>
            <StarRating
              rating={formData.foodQuality}
              onRatingChange={(rating) => setFormData(prev => ({ ...prev, foodQuality: rating }))}
            />
          </div>
        </div>

        {/* Service Quality Rating */}
        <div className="space-y-4">
          <label htmlFor="serviceQuality" className="block text-sm font-medium text-gray-700">
            {t('serviceQuality')}
          </label>
          <div id="serviceQuality" role="radiogroup" aria-label={t('serviceQuality')}>
            <StarRating
              rating={formData.serviceQuality}
              onRatingChange={(rating) => setFormData(prev => ({ ...prev, serviceQuality: rating }))}
            />
          </div>
        </div>

        {/* Improvements */}
        <div>
          <label htmlFor="improvements" className="block text-sm font-medium text-gray-700 mb-1">
            {t('improvements')}
          </label>
          <textarea
            id="improvements"
            name="improvements"
            value={formData.improvements}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label={t('improvements')}
          />
        </div>

        {/* Additional Comments */}
        <div>
          <label htmlFor="additionalComments" className="block text-sm font-medium text-gray-700 mb-1">
            {t('additionalComments')}
          </label>
          <textarea
            id="additionalComments"
            name="additionalComments"
            value={formData.additionalComments}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label={t('additionalComments')}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label={t('submit')}
        >
          {isSubmitting ? 'Submitting...' : t('submit')}
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm; 