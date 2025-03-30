import { useTranslation } from 'react-i18next';

const HalalLogo = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center">
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Halal_logo.svg"
        alt="Halal Certified"
        className="h-8 w-8"
      />
    </div>
  );
};

export default HalalLogo; 