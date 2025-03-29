import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HalalLogo from './HalalLogo';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-xl font-bold text-gray-800">
            {t('restaurantName')}
          </Link>
          <div className="hidden sm:flex space-x-4">
            <Link to="/review" className="text-gray-600 hover:text-gray-900">
              {t('review')}
            </Link>
            <Link to="/feedback" className="text-gray-600 hover:text-gray-900">
              {t('feedback')}
            </Link>
            <Link to="/admin" className="text-gray-600 hover:text-gray-900">
              {t('admin', 'Admin')}
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          <HalalLogo />
        </div>
      </nav>
    </header>
  );
};

export default Header; 