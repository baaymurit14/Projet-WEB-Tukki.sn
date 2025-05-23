import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useAuth, supabase } from '../contexte/AuthentificationContexte';

const Connexion: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { connexion, etatAuthentification } = useAuth();

  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreurForm, setErreurForm] = useState<string | null>(null);
  const [chargement, setChargement] = useState(false);

  // Récupérer l'URL de redirection depuis les paramètres d'URL (si elle existe)
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirectTo') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreurForm(null);

    if (!email.trim() || !motDePasse.trim()) {
      setErreurForm(t('errors.required'));
      return;
    }

    try {
      setChargement(true);
      await connexion(email, motDePasse);

      // Récupérer l'utilisateur connecté depuis Supabase
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw userError || new Error('Utilisateur non trouvé');
      }

      // Récupérer le profil pour vérifier le rôle
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) {
        throw error;
      }

      if (profile?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(redirectTo);
      }
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      setErreurForm(
        error.response?.data?.message ||
        error.message ||
        t('errors.loginFailed')
      );
    } finally {
      setChargement(false);
    }
  };

  // Si l'utilisateur est déjà connecté, rediriger vers la page d'accueil
  if (etatAuthentification.estConnecte) {
    navigate(redirectTo);
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            {t('auth.loginTitle')}
          </h1>
          <p className="text-gray-600">
            {t('auth.noAccount')}{' '}
            <Link to="/inscription" className="text-primary hover:underline">
              {t('auth.registerButton')}
            </Link>
          </p>
        </div>

        {erreurForm && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
            <AlertCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
            <span>{erreurForm}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Champ Email */}
            <div>
              <label htmlFor="email" className="label">
                {t('auth.email')}
              </label>
              <div className="relative mb-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
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
                  className="input connexion-input pl-14"
                  placeholder="exemple@email.com"
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="label">
                  {t('auth.password')}
                </label>
                <Link
                  to="/mot-de-passe-oublie"
                  className="text-sm text-primary hover:underline"
                >
                  {t('auth.forgotPassword')}
                </Link>
              </div>
              <div className="relative mb-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  className="input connexion-input pl-14"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>
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
                <LogIn size={18} className="mr-2" />
              )}
              {t('auth.loginButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Connexion;