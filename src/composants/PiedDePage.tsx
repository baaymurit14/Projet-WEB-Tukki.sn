import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/images/logo.png';

const PiedDePage: React.FC = () => {
  const { t } = useTranslation();
  const annee = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="inline-block">
              <img src={logo} alt="Tukki" className="h-12 w-auto" />
            </Link>
            <p className="text-gray-400 mt-2">
              {t('app.tagline')}
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/recherche" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.search')}
                </Link>
              </li>
              <li>
                <Link to="/covoiturage" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.carpooling')}
                </Link>
              </li>
              <li>
                <Link to="/inscription" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.register')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Pages d'informations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/a-propos" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link to="/conditions" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/confidentialite" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Coordonnées */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <MapPin size={18} className="text-primary" />
                <span className="text-gray-400">Dakar, Sénégal</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary" />
                <span className="text-gray-400">+221 77 123 45 67</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary" />
                <span className="text-gray-400">contact@tukki.sn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {annee} Tukki. {t('footer.copyright')}
            </p>
            <div className="flex space-x-6">
              <Link to="/conditions" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t('footer.terms')}
              </Link>
              <Link to="/confidentialite" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t('footer.privacy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PiedDePage;