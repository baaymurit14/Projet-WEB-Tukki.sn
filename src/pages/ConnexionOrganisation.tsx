import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConnexionOrganisation: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simuler une vérification des identifiants
    if (email === 'organisation@example.com' && password === 'password123') {
      alert('Connexion réussie !');
      navigate('/dashboard'); // Redirige vers le tableau de bord des organisations
    } else {
      alert('Identifiants incorrects. Veuillez réessayer.');
    }
  };

  const handleInscription = () => {
    navigate('/inscription-organisation'); // Redirige vers la page d'inscription des organisations
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Connexion Organisation</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Adresse e-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="Exemple : organisation@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          Se connecter
        </button>
      </form>

      {/* Bouton pour s'inscrire */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">Vous n'avez pas encore de compte ?</p>
        <button
          onClick={handleInscription}
          className="btn-secondary mt-2"
        >
          S'inscrire en tant qu'organisation
        </button>
      </div>
    </div>
  );
};

export default ConnexionOrganisation;