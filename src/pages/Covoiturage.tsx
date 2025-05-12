import React, { useState } from 'react';

const Covoiturage: React.FC = () => {
  const [formData, setFormData] = useState({
    depart: '',
    arrivee: '',
    heureDepart: '',
    places: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Réservation soumise :', formData);
    alert('Votre réservation a été soumise avec succès !');
    // Vous pouvez ajouter ici une logique pour envoyer les données au backend
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Réserver un covoiturage</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champ de départ */}
        <div>
          <label htmlFor="depart" className="block text-sm font-medium text-gray-700">
            Lieu de départ
          </label>
          <input
            type="text"
            id="depart"
            name="depart"
            value={formData.depart}
            onChange={handleChange}
            className="input"
            placeholder="Exemple : Dakar"
            required
          />
        </div>

        {/* Champ d'arrivée */}
        <div>
          <label htmlFor="arrivee" className="block text-sm font-medium text-gray-700">
            Lieu d'arrivée
          </label>
          <input
            type="text"
            id="arrivee"
            name="arrivee"
            value={formData.arrivee}
            onChange={handleChange}
            className="input"
            placeholder="Exemple : Saint-Louis"
            required
          />
        </div>

        {/* Champ pour l'heure de départ */}
        <div>
          <label htmlFor="heureDepart" className="block text-sm font-medium text-gray-700">
            Heure de départ
          </label>
          <input
            type="time"
            id="heureDepart"
            name="heureDepart"
            value={formData.heureDepart}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        {/* Champ pour le nombre de places */}
        <div>
          <label htmlFor="places" className="block text-sm font-medium text-gray-700">
            Nombre de places
          </label>
          <input
            type="number"
            id="places"
            name="places"
            value={formData.places}
            onChange={handleChange}
            className="input"
            min="1"
            max="10"
            required
          />
        </div>

        {/* Bouton de soumission */}
        <div>
          <button
            type="submit"
            className="btn-primary w-full"
          >
            Réserver
          </button>
        </div>
      </form>
    </div>
  );
};

export default Covoiturage;