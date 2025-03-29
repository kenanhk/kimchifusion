import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 rounded text-sm ${
          i18n.language === 'en'
            ? 'bg-gray-800 text-white'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('zh')}
        className={`px-2 py-1 rounded text-sm ${
          i18n.language === 'zh'
            ? 'bg-gray-800 text-white'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
      >
        简体
      </button>
      <button
        onClick={() => changeLanguage('zh-TW')}
        className={`px-2 py-1 rounded text-sm ${
          i18n.language === 'zh-TW'
            ? 'bg-gray-800 text-white'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
      >
        繁體
      </button>
    </div>
  );
};

export default LanguageSelector; 