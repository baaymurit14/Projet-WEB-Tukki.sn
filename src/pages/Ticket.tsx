import React from 'react';
import { useLocation } from 'react-router-dom';

const Ticket: React.FC = () => {
  const location = useLocation();
  const { trajet, paymentMethod, paymentNumber } = location.state || {};

  if (!trajet) {
    return <p>Aucun ticket disponible.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Votre Ticket</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">{trajet.compagnie.nom}</h2>
        <img src={trajet.compagnie.logo} alt={trajet.compagnie.nom} className="w-16 h-16 mb-4" />
        <p><strong>Départ :</strong> {trajet.depart.ville} ({trajet.depart.heure})</p>
        <p><strong>Arrivée :</strong> {trajet.arrivee.ville} ({trajet.arrivee.heure})</p>
        <p><strong>Prix :</strong> {trajet.prix} FCFA</p>
        <p><strong>Méthode de paiement :</strong> {paymentMethod}</p>
        <p><strong>Numéro de paiement :</strong> {paymentNumber}</p>
      </div>
      <div className="mt-6 text-center">
        <p className="text-green-500 text-lg font-semibold">Paiement réussi !</p>
        <p className="text-gray-600">Merci d'avoir utilisé notre service.</p>
      </div>
    </div>
  );
};

export default Ticket;