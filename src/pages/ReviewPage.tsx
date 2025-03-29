import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReviewForm from '../components/ReviewForm';
import ReviewPlatformSelect from '../components/ReviewPlatformSelect';

// External review links
const EXTERNAL_REVIEW_LINKS = {
  google: 'https://www.google.com.hk/search?sca_esv=bf7982eb391d69ba&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzWSIIl45Oh4NTWPc-dLAGHTQ_bYEhXIzmwkVilTBtAx42SnW0ZP8Eh4q4zGHOr5Cu5sBBM0vrIU1L5YZltHklB4i0rbgY1dtSQGcTGFTKGn8oKQotA%3D%3D&q=Kimchi+Korean+Fusion+Reviews&sa=X&ved=2ahUKEwjk7JKeo6mMAxXKrlYBHdlrDKQQ0bkNegQIJhAD&biw=1912&bih=954&dpr=1',
  openrice: 'https://www.openrice.com/en/hongkong/review/write/712509'
};

const ReviewPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPlatformSelect, setShowPlatformSelect] = useState(false);

  const handleReviewSubmit = (rating: number) => {
    if (rating === 5) {
      setShowPlatformSelect(true);
    } else {
      navigate('/feedback');
    }
  };

  const handlePlatformSelect = (platform: 'google' | 'openrice') => {
    window.location.href = EXTERNAL_REVIEW_LINKS[platform];
  };

  if (showPlatformSelect) {
    return <ReviewPlatformSelect onSelect={handlePlatformSelect} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          {t('shareExperience')}
        </h1>
        <ReviewForm onSubmit={handleReviewSubmit} />
      </div>
    </div>
  );
};

export default ReviewPage; 