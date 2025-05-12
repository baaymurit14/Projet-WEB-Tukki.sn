import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, KeyRound, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexte/AuthentificationContexte';

const MotDePasseOublie: React.FC = () => {
  const { t } = useTranslation();
  const { motDePasseOublie } = useAuth();

  const [email, setEmail] = useState('');
  const [erreur, setErreur] = useState<string | null>(null);
  const [succes, setSucces] = useState(false);
  const [chargement, setChargement] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Réinitialiser les états
    setErreur(null);
    setSucces(false);
    
    // Validation basique
    if (!email.trim()) {
      setErreur(t('errors.required'));
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErreur(t('errors.invalidEmail'));
      return;
    }
    
    try {
      setChargement(true);
      await motDePasseOublie(email);
      setSucces(true);
    } catch (error: any) {
      console.error('Erreur lors de la réinitialisation du mot de passe:', error);
      setErreur(
        error.response?.data?.message || 
        'Une erreur est survenue lors de l\'envoi du lien de réinitialisation.'
      );
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            {t('auth.resetPasswordTitle')}
          </h1>
          <p className="text-gray-600">
            Entrez votre adresse email pour recevoir un lien de réinitialisation
          </p>
        </div>
        
        {erreur && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
            <AlertCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
            <span>{erreur}</span>
          </div>
        )}
        
        {succes && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-start">
            <CheckCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
            <span>Un lien de réinitialisation a été envoyé à votre adresse email.</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input pl-10"
                placeholder="exemple@email.com"
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={chargement || succes}
              className="btn-primary w-full flex justify-center items-center"
            >
              {chargement ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : (
                <KeyRound size={18} className="mr-2" />
              )}
              {t('auth.resetPasswordButton')}
            </button>
          </div>
          
          <div className="text-center">
            <Link to="/connexion" className="text-primary hover:underline">
              Retour à la connexion
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MotDePasseOublie;