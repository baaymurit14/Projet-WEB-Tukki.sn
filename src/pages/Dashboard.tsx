import React, { useState } from 'react';

const Dashboard: React.FC = () => {
  const [formType, setFormType] = useState<'bus' | 'covoiturage' | null>(null);

  const handleFormTypeChange = (type: 'bus' | 'covoiturage') => {
    setFormType(type);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Trajet enregistré avec succès !');
    setFormType(null); // Réinitialiser le formulaire après soumission
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>

      {/* Boutons pour sélectionner le type de formulaire */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleFormTypeChange('bus')}
          className="btn-primary"
        >
          Enregistrer un trajet (Bus)
        </button>
        <button
          onClick={() => handleFormTypeChange('covoiturage')}
          className="btn-secondary"
        >
          Enregistrer un trajet (Covoiturage)
        </button>
      </div>

      {/* Formulaire pour enregistrer un trajet */}
      {formType === 'bus' && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Enregistrer un trajet (Bus)</h2>
          <div>
            <label htmlFor="typeBus" className="block text-sm font-medium text-gray-700">
              Type de bus
            </label>
            <input
              type="text"
              id="typeBus"
              name="typeBus"
              className="input"
              placeholder="Exemple : Bus climatisé"
              required
            />
          </div>
          <div>
            <label htmlFor="places" className="block text-sm font-medium text-gray-700">
              Nombre de places disponibles
            </label>
            <input
              type="number"
              id="places"
              name="places"
              className="input"
              placeholder="Exemple : 50"
              required
            />
          </div>
          <div>
            <label htmlFor="wifi" className="block text-sm font-medium text-gray-700">
              Wi-Fi disponible ?
            </label>
            <select id="wifi" name="wifi" className="input" required>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </div>
          <div>
            <label htmlFor="regionDepart" className="block text-sm font-medium text-gray-700">
              Région de départ
            </label>
            <input
              type="text"
              id="regionDepart"
              name="regionDepart"
              className="input"
              placeholder="Exemple : Dakar"
              required
            />
          </div>
          <div>
            <label htmlFor="lieuDepart" className="block text-sm font-medium text-gray-700">
              Lieu de départ
            </label>
            <input
              type="text"
              id="lieuDepart"
              name="lieuDepart"
              className="input"
              placeholder="Exemple : Gare routière"
              required
            />
          </div>
          <div>
            <label htmlFor="regionArrivee" className="block text-sm font-medium text-gray-700">
              Région d'arrivée
            </label>
            <input
              type="text"
              id="regionArrivee"
              name="regionArrivee"
              className="input"
              placeholder="Exemple : Saint-Louis"
              required
            />
          </div>
          <div>
            <label htmlFor="lieuArrivee" className="block text-sm font-medium text-gray-700">
              Lieu d'arrivée
            </label>
            <input
              type="text"
              id="lieuArrivee"
              name="lieuArrivee"
              className="input"
              placeholder="Exemple : Gare routière"
              required
            />
          </div>
          <div>
            <label htmlFor="heureDepart" className="block text-sm font-medium text-gray-700">
              Heure de départ
            </label>
            <input
              type="time"
              id="heureDepart"
              name="heureDepart"
              className="input"
              required
            />
          </div>
          <div>
            <label htmlFor="heureArrivee" className="block text-sm font-medium text-gray-700">
              Heure d'arrivée
            </label>
            <input
              type="time"
              id="heureArrivee"
              name="heureArrivee"
              className="input"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Enregistrer le trajet
          </button>
        </form>
      )}

      {formType === 'covoiturage' && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Enregistrer un trajet (Covoiturage)</h2>
          <div>
            <label htmlFor="marque" className="block text-sm font-medium text-gray-700">
              Marque du véhicule
            </label>
            <input
              type="text"
              id="marque"
              name="marque"
              className="input"
              placeholder="Exemple : Toyota"
              required
            />
          </div>
          <div>
            <label htmlFor="places" className="block text-sm font-medium text-gray-700">
              Nombre de places disponibles
            </label>
            <input
              type="number"
              id="places"
              name="places"
              className="input"
              placeholder="Exemple : 5"
              required
            />
          </div>
          <div>
            <label htmlFor="regionDepart" className="block text-sm font-medium text-gray-700">
              Région de départ
            </label>
            <input
              type="text"
              id="regionDepart"
              name="regionDepart"
              className="input"
              placeholder="Exemple : Dakar"
              required
            />
          </div>
          <div>
            <label htmlFor="lieuDepart" className="block text-sm font-medium text-gray-700">
              Lieu de départ
            </label>
            <input
              type="text"
              id="lieuDepart"
              name="lieuDepart"
              className="input"
              placeholder="Exemple : Gare routière"
              required
            />
          </div>
          <div>
            <label htmlFor="regionArrivee" className="block text-sm font-medium text-gray-700">
              Région d'arrivée
            </label>
            <input
              type="text"
              id="regionArrivee"
              name="regionArrivee"
              className="input"
              placeholder="Exemple : Saint-Louis"
              required
            />
          </div>
          <div>
            <label htmlFor="lieuArrivee" className="block text-sm font-medium text-gray-700">
              Lieu d'arrivée
            </label>
            <input
              type="text"
              id="lieuArrivee"
              name="lieuArrivee"
              className="input"
              placeholder="Exemple : Gare routière"
              required
            />
          </div>
          <div>
            <label htmlFor="heureDepart" className="block text-sm font-medium text-gray-700">
              Heure de départ
            </label>
            <input
              type="time"
              id="heureDepart"
              name="heureDepart"
              className="input"
              required
            />
          </div>
          <div>
            <label htmlFor="heureArrivee" className="block text-sm font-medium text-gray-700">
              Heure d'arrivée
            </label>
            <input
              type="time"
              id="heureArrivee"
              name="heureArrivee"
              className="input"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Enregistrer le trajet
          </button>
        </form>
      )}
    </div>
  );
};

export default Dashboard;