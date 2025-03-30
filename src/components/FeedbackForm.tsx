import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import supabase, { testSupabaseConnection } from '../utils/supabaseClient';
import { sanitizeInput, isValidEmail, isValidPhone, checkRateLimit, getRateLimitResetTime } from '../utils/security';
import { handleError, safeLogError } from '../utils/errorHandler';
import { PostgrestError } from '@supabase/supabase-js';

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
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
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

  useEffect(() => {
    const checkConnection = async () => {
      const connected = await testSupabaseConnection();
      setIsConnected(connected);
      if (!connected) {
        setError('Unable to connect to the server. Please try again later.');
      }
    };
    checkConnection();
  }, []);

  const validateForm = (): boolean => {
    // Reset error
    setError(null);

    // Check rate limit
    if (!checkRateLimit()) {
      const resetTime = Math.ceil(getRateLimitResetTime() / (60 * 1000)); // Convert to minutes
      setError(`Too many submissions. Please try again in ${resetTime} minutes.`);
      return false;
    }

    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Name and email are required.');
      return false;
    }

    // Validate field lengths
    if (formData.name.length > 100) {
      setError('Name must be less than 100 characters.');
      return false;
    }
    if (formData.email.length > 100) {
      setError('Email must be less than 100 characters.');
      return false;
    }
    if (formData.phone && formData.phone.length > 20) {
      setError('Phone number must be less than 20 characters.');
      return false;
    }
    if (formData.enjoyedMost.length > 500) {
      setError('Enjoyed most field must be less than 500 characters.');
      return false;
    }
    if (formData.improvements.length > 500) {
      setError('Improvements field must be less than 500 characters.');
      return false;
    }
    if (formData.additionalComments.length > 1000) {
      setError('Additional comments must be less than 1000 characters.');
      return false;
    }

    // Validate email format
    if (!isValidEmail(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return false;
    }

    // Validate phone if provided
    if (formData.phone && !isValidPhone(formData.phone)) {
      setError('Please enter a valid phone number.');
      return false;
    }

    // Validate rating values
    if (formData.overallRating < 0 || formData.overallRating > 5) {
      setError('Overall rating must be between 0 and 5.');
      return false;
    }
    if (formData.foodQuality < 0 || formData.foodQuality > 5) {
      setError('Food quality rating must be between 0 and 5.');
      return false;
    }
    if (formData.serviceQuality < 0 || formData.serviceQuality > 5) {
      setError('Service quality rating must be between 0 and 5.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Sanitize all text inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: formData.email.trim().toLowerCase(),
        phone: sanitizeInput(formData.phone),
        overall_rating: Math.min(Math.max(formData.overallRating, 0), 5), // Ensure rating is between 0-5
        enjoyed_most: sanitizeInput(formData.enjoyedMost),
        food_quality: Math.min(Math.max(formData.foodQuality, 0), 5), // Ensure rating is between 0-5
        service_quality: Math.min(Math.max(formData.serviceQuality, 0), 5), // Ensure rating is between 0-5
        improvements: sanitizeInput(formData.improvements),
        additional_comments: sanitizeInput(formData.additionalComments)
      };

      console.log('Attempting to submit feedback:', {
        ...sanitizedData,
        phone: sanitizedData.phone || 'not provided'
      });

      const { error: supabaseError } = await supabase
        .from('feedbacks')
        .insert([sanitizedData]) as { error: PostgrestError | null };

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw supabaseError;
      }

      console.log('Feedback submitted successfully');

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
      console.error('Submission error:', error);
      const { userMessage, shouldLog } = handleError(error);
      if (shouldLog) {
        safeLogError(error, 'Feedback submission error');
      }
      setError(userMessage);
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

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {isConnected === false && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <p className="text-yellow-700">Connection issues detected. Please check your internet connection and try again.</p>
        </div>
      )}

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
              maxLength={100}
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
              maxLength={20}
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
              maxLength={100}
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
            maxLength={500}
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
            maxLength={500}
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
            maxLength={1000}
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