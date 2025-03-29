import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import './i18n/config';
import Home from './pages/Home';
import ReviewPage from './pages/ReviewPage';
import FeedbackPage from './pages/FeedbackPage';
import AdminPage from './pages/AdminPage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
