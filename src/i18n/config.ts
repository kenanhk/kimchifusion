import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      restaurantName: 'Kimchi Korean Fusion',
      home: 'Home',
      review: 'Review',
      feedback: 'Feedback',
      heroTitle: 'Welcome to Our Restaurant',
      heroSubtitle: 'We value your feedback! Share your dining experience with us.',
      leaveReview: 'Leave a Review',
      // Review page translations
      shareExperience: 'Share Your Experience',
      rateExperience: 'How would you rate your experience?',
      submitReview: 'Submit Review',
      selectPlatform: 'Where would you like to share your review?',
      googleReviews: 'Google Reviews',
      openRice: 'OpenRice',
      // Feedback page translations
      feedbackTitle: 'Please take a moment to share your feedback',
      feedbackSubtitle: 'Your feedback helps us improve your experience',
      personalInfo: 'Personal Information',
      name: 'Name',
      phoneNumber: 'Phone number',
      email: 'Email',
      feedbackQuestions: 'Feedback Questions',
      overallExperience: 'How would you rate your overall dining experience?',
      enjoyedMost: 'What did you enjoy most about your visit?',
      foodQuality: 'How was the quality of the food?',
      serviceQuality: 'How was the service you received?',
      improvements: 'What can we improve for your next visit?',
      additionalComments: 'Additional Comments or Suggestions',
      submit: 'Submit Feedback',
      // Add more translations as needed
    }
  },
  zh: {
    translation: {
      restaurantName: 'Kimchi Korean Fusion',
      home: '首頁',
      review: '評論',
      feedback: '反饋',
      heroTitle: '歡迎光臨我們的餐廳',
      heroSubtitle: '我們重視您的意見！請與我們分享您的用餐體驗。',
      leaveReview: '發表評論',
      // Review page translations
      shareExperience: '分享您的體驗',
      rateExperience: '您如何評價您的用餐體驗？',
      submitReview: '提交評論',
      selectPlatform: '您想在哪個平台分享您的評論？',
      googleReviews: 'Google 評論',
      openRice: 'OpenRice',
      // Feedback page translations
      feedbackTitle: '請花一點時間分享您的意見',
      feedbackSubtitle: '您的意見幫助我們改善您的用餐體驗',
      personalInfo: '個人資料',
      name: '姓名',
      phoneNumber: '電話號碼',
      email: '電子郵件',
      feedbackQuestions: '意見調查',
      overallExperience: '您如何評價整體用餐體驗？',
      enjoyedMost: '您最喜歡這次用餐的哪些方面？',
      foodQuality: '您如何評價食物的品質？',
      serviceQuality: '您如何評價服務品質？',
      improvements: '您希望我們在哪些方面改進？',
      additionalComments: '其他意見或建議',
      submit: '提交意見',
      // Add more translations as needed
    }
  },
  'zh-TW': {
    translation: {
      restaurantName: 'Kimchi Korean Fusion',
      home: '首頁',
      review: '評論',
      feedback: '反饋',
      heroTitle: '歡迎光臨我們的餐廳',
      heroSubtitle: '我們重視您的意見！請與我們分享您的用餐體驗。',
      leaveReview: '發表評論',
      // Review page translations
      shareExperience: '分享您的體驗',
      rateExperience: '您如何評價您的用餐體驗？',
      submitReview: '提交評論',
      selectPlatform: '您想在哪個平台分享您的評論？',
      googleReviews: 'Google 評論',
      openRice: 'OpenRice',
      // Feedback page translations
      feedbackTitle: '請花一點時間分享您的意見',
      feedbackSubtitle: '您的意見幫助我們改善您的用餐體驗',
      personalInfo: '個人資料',
      name: '姓名',
      phoneNumber: '電話號碼',
      email: '電子郵件',
      feedbackQuestions: '意見調查',
      overallExperience: '您如何評價整體用餐體驗？',
      enjoyedMost: '您最喜歡這次用餐的哪些方面？',
      foodQuality: '您如何評價食物的品質？',
      serviceQuality: '您如何評價服務品質？',
      improvements: '您希望我們在哪些方面改進？',
      additionalComments: '其他意見或建議',
      submit: '提交意見',
      // Add more translations as needed
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 