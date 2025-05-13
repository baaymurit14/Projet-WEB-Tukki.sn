import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexte/AuthentificationContexte';
import logo from '../assets/images/logo.png';

const BarreNavigation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { etatAuthentification, deconnexion } = useAuth();
  const navigate = useNavigate();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [menuUtilisateurOuvert, setMenuUtilisateurOuvert] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const changerLangue = (langue: string) => {
    i18n.changeLanguage(langue);
  };

  const handleDeconnexion = () => {
    deconnexion();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src={logo} 
            alt={t('app.name')} 
            className="h-12 w-auto" 
          />
        </Link>

        {/* Menu pour écrans larges */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-800 hover:text-primary font-medium transition-colors">
            {t('nav.home')}
          </Link>
          <Link to="/recherche" className="text-gray-800 hover:text-primary font-medium transition-colors">
            {t('nav.search')}
          </Link>
          <Link to="/covoiturage" className="text-gray-800 hover:text-primary font-medium transition-colors">
            {t('nav.carpooling')}
          </Link>
          <Link to="/connexion-organisation" className="text-gray-800 hover:text-primary font-medium transition-colors">
              Organisation
          </Link>
          
          
          {!etatAuthentification.estConnecte ? (
            <>
              <Link to="/connexion" className="text-gray-800 hover:text-primary font-medium transition-colors">
                {t('nav.login')}
              </Link>
              <Link 
                to="/inscription" 
                className="btn-primary"
              >
                {t('nav.register')}
              </Link>
            </>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setMenuUtilisateurOuvert(!menuUtilisateurOuvert)}
                className="flex items-center space-x-2 text-gray-800 hover:text-primary font-medium"
              >
                <User size={20} />
                <span>{etatAuthentification.utilisateur?.nom.split(' ')[0]}</span>
              </button>
              
              {menuUtilisateurOuvert && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuUtilisateurOuvert(false)}
                  >
                    {t('nav.profile')}
                  </Link>
                  
                  {etatAuthentification.utilisateur?.role === 'utilisateur' && (
                    <Link 
                      to="/tableau-de-bord" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setMenuUtilisateurOuvert(false)}
                    >
                      {t('nav.dashboard')}
                    </Link>
                  )}
                  
                  {etatAuthentification.utilisateur?.role === 'compagnie' && (
                    <Link 
                      to="/compagnie/tableau-de-bord" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setMenuUtilisateurOuvert(false)}
                    >
                      {t('nav.dashboard')}
                    </Link>
                  )}
                  
                  {etatAuthentification.utilisateur?.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setMenuUtilisateurOuvert(false)}
                    >
                      {t('admin.title')}
                    </Link>
                  )}
                  
                  <button 
                    onClick={() => {
                      setMenuUtilisateurOuvert(false);
                      handleDeconnexion();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-2">
                      <LogOut size={16} />
                      <span>{t('nav.logout')}</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}
          
          <div className="relative">
            <button 
              className="flex items-center text-gray-800 hover:text-primary"
              onClick={() => changerLangue(i18n.language === 'fr' ? 'wo' : 'fr')}
            >
              <Globe size={20} />
              <span className="ml-1">{i18n.language === 'fr' ? 'FR' : 'WO'}</span>
            </button>
          </div>
        </div>

        {/* Menu burger pour mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOuvert(!menuOuvert)} className="text-gray-800">
            {menuOuvert ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {menuOuvert && (
        <div className="md:hidden bg-white w-full shadow-lg py-4 px-4 animate-fade-in absolute top-16">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-800 hover:text-primary font-medium py-2 transition-colors"
              onClick={() => setMenuOuvert(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/recherche" 
              className="text-gray-800 hover:text-primary font-medium py-2 transition-colors"
              onClick={() => setMenuOuvert(false)}
            >
              {t('nav.search')}
            </Link>
            <Link 
              to="/covoiturage" 
              className="text-gray-800 hover:text-primary font-medium py-2 transition-colors"
              onClick={() => setMenuOuvert(false)}
            >
              {t('nav.carpooling')}
            </Link>
            <Link 
            to="/connexion-organisation" 
            className="text-gray-800 hover:text-primary font-medium py-2 transition-colors"
            onClick={() => setMenuOuvert(false)}
            >
            Organisation
            </Link>
            
            {!etatAuthentification.estConnecte ? (
              <>
                <Link 
                  to="/connexion" 
                  className="text-gray-800 hover:text-primary font-medium py-2 transition-colors"
                  onClick={() => setMenuOuvert(false)}
                >
                  {t('nav.login')}
                </Link>
                <Link 
                  to="/inscription" 
                  className="btn-primary inline-block text-center"
                  onClick={() => setMenuOuvert(false)}
                >
                  {t('nav.register')}
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/profil" 
                  className="text-gray-800 hover:text-primary font-medium py-2 transition-colors"
                  onClick={() => setMenuOuvert(false)}
                >
                  {t('nav.profile')}
                </Link>
                
                {etatAuthentification.utilisateur?.role === 'utilisateur' && (
                  <Link 
                    to="/tableau-de-bord" 
                    className="text-gray-800 hover:text-primary font-medium py-2 transition-colors"
                    onClick={() => setMenuOuvert(false)}
                  >
                    {t('nav.dashboard')}
                  </Link>
                )}
                
                {etatAuthentification.utilisateur?.role === 'compagnie' && (
                  <Link 
                    to="/compagnie/tableau-de-bord" 
                    className="text-gray-800 hover:text-primary font-medium py-2 transition-colors"
                    onClick={() => setMenuOuvert(false)}
                  >
                    {t('nav.dashboard')}
                  </Link>
                )}
                
                {etatAuthentification.utilisateur?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="text-gray-800 hover:text-primary font-medium py-2 transition-colors"
                    onClick={() => setMenuOuvert(false)}
                  >
                    {t('admin.title')}
                  </Link>
                )}
                
                <button 
                  onClick={() => {
                    setMenuOuvert(false);
                    handleDeconnexion();
                  }}
                  className="text-gray-800 hover:text-primary font-medium py-2 transition-colors text-left"
                >
                  <div className="flex items-center space-x-2">
                    <LogOut size={16} />
                    <span>{t('nav.logout')}</span>
                  </div>
                </button>
              </>
            )}
            
            <button 
              className="flex items-center text-gray-800 hover:text-primary py-2"
              onClick={() => {
                changerLangue(i18n.language === 'fr' ? 'wo' : 'fr');
                setMenuOuvert(false);
              }}
            >
              <Globe size={20} />
              <span className="ml-2">{i18n.language === 'fr' ? 'Français' : 'Wolof'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default BarreNavigation;