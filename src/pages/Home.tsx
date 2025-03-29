import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SupabaseTest from '../components/SupabaseTest';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-8">
          {t('heroTitle')}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto px-4">
          {t('heroSubtitle')}
        </p>
        <Link
          to="/review"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base md:text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          {t('leaveReview')}
        </Link>
      </div>

      {/* Supabase Connection Test */}
      <div className="mt-8 md:mt-12">
        <SupabaseTest />
      </div>
    </div>
  );
};

export default Home; 