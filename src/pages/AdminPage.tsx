import { useTranslation } from 'react-i18next';
import FeedbackList from '../components/FeedbackList';

const AdminPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {t('adminTitle', 'Customer Feedbacks')}
        </h1>
        <FeedbackList />
      </div>
    </div>
  );
};

export default AdminPage; 