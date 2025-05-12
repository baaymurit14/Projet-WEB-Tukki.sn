import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User, Phone, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexte/AuthentificationContexte';

const Inscription: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { inscription, etatAuthentification } = useAuth();

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    motDePasse: '',
    confirmationMotDePasse: ''
  });
  const [erreurs, setErreurs] = useState<Record<string, string>>({});
  const [erreurGlobale, setErreurGlobale] = useState<string | null>(null);
  const [chargement, setChargement] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Effacer l'erreur du champ modifié
    if (erreurs[name]) {
      setErreurs({ ...erreurs, [name]: '' });
    }
  };

  const validerFormulaire = () => {
    const nouvellesErreurs: Record<string, string> = {};
    
    // Vérification du nom
    if (!formData.nom.trim()) {
      nouvellesErreurs.nom = t('errors.required');
    }
    
    // Vérification de l'email
    if (!formData.email.trim()) {
      nouvellesErreurs.email = t('errors.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nouvellesErreurs.email = t('errors.invalidEmail');
    }
    
    // Vérification du téléphone
    if (!formData.telephone.trim()) {
      nouvellesErreurs.telephone = t('errors.required');
    } else if (!/^\+?[0-9]{8,15}$/.test(formData.telephone)) {
      nouvellesErreurs.telephone = t('errors.invalidPhone');
    }
    
    // Vérification du mot de passe
    if (!formData.motDePasse) {
      nouvellesErreurs.motDePasse = t('errors.required');
    } else if (formData.motDePasse.length < 6) {
      nouvellesErreurs.motDePasse = t('errors.passwordLength');
    }
    
    // Vérification de la confirmation du mot de passe
    if (formData.motDePasse !== formData.confirmationMotDePasse) {
      nouvellesErreurs.confirmationMotDePasse = t('errors.passwordMatch');
    }
    
    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Réinitialiser l'erreur globale
    setErreurGlobale(null);
    
    // Valider le formulaire
    if (!validerFormulaire()) {
      return;
    }
    
    try {
      setChargement(true);
      await inscription(
        formData.nom,
        formData.email,
        formData.telephone,
        formData.motDePasse
      );
      navigate('/');
    } catch (error: any) {
      console.error('Erreur d\'inscription:', error);
      setErreurGlobale(
        error.response?.data?.message || 
        t('errors.registrationFailed')
      );
    } finally {
      setChargement(false);
    }
  };

  // Si l'utilisateur est déjà connecté, rediriger vers la page d'accueil
  if (etatAuthentification.estConnecte) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            {t('auth.registerTitle')}
          </h1>
          <p className="text-gray-600">
            {t('auth.hasAccount')} <Link to="/connexion" className="text-primary hover:underline">{t('auth.loginButton')}</Link>
          </p>
        </div>
        
        {erreurGlobale && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
            <AlertCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
            <span>{erreurGlobale}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="nom" className="label">
                {t('auth.fullName')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  value={formData.nom}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="Prénom Nom"
                />
              </div>
              {erreurs.nom && <p className="mt-1 text-sm text-red-600">{erreurs.nom}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="label">
                {t('auth.email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="exemple@email.com"
                />
              </div>
              {erreurs.email && <p className="mt-1 text-sm text-red-600">{erreurs.email}</p>}
            </div>
            
            <div>
              <label htmlFor="telephone" className="label">
                {t('auth.phoneNumber')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400" />
                </div>
                <input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="+221 XX XXX XX XX"
                />
              </div>
              {erreurs.telephone && <p className="mt-1 text-sm text-red-600">{erreurs.telephone}</p>}
            </div>
            
            <div>
              <label htmlFor="motDePasse" className="label">
                {t('auth.password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="motDePasse"
                  name="motDePasse"
                  type="password"
                  value={formData.motDePasse}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="••••••••"
                />
              </div>
              {erreurs.motDePasse && <p className="mt-1 text-sm text-red-600">{erreurs.motDePasse}</p>}
            </div>
            
            <div>
              <label htmlFor="confirmationMotDePasse" className="label">
                {t('auth.confirmPassword')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="confirmationMotDePasse"
                  name="confirmationMotDePasse"
                  type="password"
                  value={formData.confirmationMotDePasse}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="••••••••"
                />
              </div>
              {erreurs.confirmationMotDePasse && (
                <p className="mt-1 text-sm text-red-600">{erreurs.confirmationMotDePasse}</p>
              )}
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={chargement}
              className="btn-primary w-full flex justify-center items-center"
            >
              {chargement ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : (
                <UserPlus size={18} className="mr-2" />
              )}
              {t('auth.registerButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Inscription;