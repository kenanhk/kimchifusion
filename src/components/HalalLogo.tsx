import { useTranslation } from 'react-i18next';

const HalalLogo = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center">
      <span className="text-sm font-medium text-gray-700 mr-2">
        {t('halalCertified', 'Halal Certified')}
      </span>
      <svg
        className="h-6 w-6 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
};

export default HalalLogo; 