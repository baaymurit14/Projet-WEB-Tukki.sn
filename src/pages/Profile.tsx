import React from 'react';
import { useAuth } from '../contexte/AuthentificationContexte';

const Profile: React.FC = () => {
  const { etatAuthentification } = useAuth();
  const { utilisateur, estConnecte, chargement } = etatAuthentification;

  if (chargement) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <p className="text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!estConnecte || !utilisateur) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <p className="text-gray-600">Veuillez vous connecter pour accéder à votre profil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/3 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-6">
          <img
            src={utilisateur.photo || "https://ui-avatars.com/api/?name=" + encodeURIComponent(utilisateur.nom)}
            alt={utilisateur.nom}
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 mb-4"
          />
          <h2 className="text-xl font-bold mb-1">{utilisateur.nom}</h2>
          <span className="text-gray-500 mb-2">{utilisateur.email}</span>
          <span className="text-gray-500">{utilisateur.telephone}</span>
        </div>
        {/* Main content */}
        <div className="md:w-2/3">
          <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">Nom complet : </span>
              <span>{utilisateur.nom}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Email : </span>
              <span>{utilisateur.email}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Téléphone : </span>
              <span>{utilisateur.telephone}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Rôle : </span>
              <span>{utilisateur.role}</span>
            </div>
          </div>
          <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded font-semibold hover:bg-blue-600 transition">
            Modifier le profil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;