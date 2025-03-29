import { useTranslation } from 'react-i18next';

interface ReviewPlatformSelectProps {
  onSelect: (platform: 'google' | 'openrice') => void;
}

const ReviewPlatformSelect = ({ onSelect }: ReviewPlatformSelectProps) => {
  const { t } = useTranslation();

  const handlePlatformSelect = (platform: 'google' | 'openrice') => {
    onSelect(platform);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          {t('selectPlatform')}
        </h1>
        
        <div className="space-y-4">
          <button
            onClick={() => handlePlatformSelect('google')}
            className="w-full bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 flex items-center justify-center space-x-3"
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="w-6 h-6"
            />
            <span className="text-lg font-medium text-gray-900">{t('googleReviews')}</span>
          </button>

          <button
            onClick={() => handlePlatformSelect('openrice')}
            className="w-full bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 flex items-center justify-center space-x-3"
          >
            <img 
              src="https://www.openrice.com/favicon.ico" 
              alt="OpenRice" 
              className="w-6 h-6"
            />
            <span className="text-lg font-medium text-gray-900">{t('openRice')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPlatformSelect; 