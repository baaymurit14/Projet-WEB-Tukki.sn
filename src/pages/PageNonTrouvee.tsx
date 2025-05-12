import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Search } from 'lucide-react';

const PageNonTrouvee: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold mt-6 mb-4">
          {t('errors.pageNotFound')}
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link 
            to="/" 
            className="btn-primary flex items-center justify-center"
          >
            <Home size={18} className="mr-2" />
            {t('nav.home')}
          </Link>
          <Link 
            to="/recherche" 
            className="btn-outline flex items-center justify-center"
          >
            <Search size={18} className="mr-2" />
            {t('nav.search')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNonTrouvee;