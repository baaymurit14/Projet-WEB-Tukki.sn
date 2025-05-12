import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Reservation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { trajet } = location.state || {}; // Récupère les données du trajet depuis la navigation

  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentNumber, setPaymentNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentMethod || !paymentNumber) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    // Simuler un paiement réussi
    alert('Paiement réussi !');
    navigate('/ticket', { state: { trajet, paymentMethod, paymentNumber } }); // Redirige vers la page du ticket
  };

  if (!trajet) {
    return <p>Aucun trajet sélectionné.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Réserver un trajet</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Informations sur le trajet */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{trajet.compagnie.nom}</h2>
          <img src={trajet.compagnie.logo} alt={trajet.compagnie.nom} className="w-16 h-16 mb-4" />
          <p><strong>Départ :</strong> {trajet.depart.ville} ({trajet.depart.heure})</p>
          <p><strong>Arrivée :</strong> {trajet.arrivee.ville} ({trajet.arrivee.heure})</p>
          <p><strong>Prix :</strong> {trajet.prix} FCFA</p>
        </div>

        {/* Formulaire de paiement */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
              Méthode de paiement
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="input"
              required
            >
              <option value="">Sélectionnez une méthode</option>
              <option value="Wave">Wave</option>
              <option value="Orange Money">Orange Money</option>
              <option value="Free Money">Free Money</option>
              <option value="Carte Bancaire">Carte Bancaire</option>
            </select>
          </div>

          <div>
            <label htmlFor="paymentNumber" className="block text-sm font-medium text-gray-700">
              Numéro de paiement
            </label>
            <input
              type="text"
              id="paymentNumber"
              name="paymentNumber"
              value={paymentNumber}
              onChange={(e) => setPaymentNumber(e.target.value)}
              className="input"
              placeholder="Entrez le numéro"
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Valider le paiement
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reservation;