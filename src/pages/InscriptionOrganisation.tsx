import React, { useState } from 'react';

const InscriptionOrganisation: React.FC = () => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Inscription réussie !');
    // Ajouter la logique pour enregistrer les données
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Inscription Organisation</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
            Nom de l'organisation
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="input"
            placeholder="Exemple : Transports Sénégal"
            required
          />
        </div>
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
            placeholder="Entrez un mot de passe"
            required
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default InscriptionOrganisation;