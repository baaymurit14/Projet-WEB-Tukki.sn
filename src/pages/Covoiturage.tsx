import React, { useState } from 'react';
import { Users, ChevronRight, MapPin, Clock, Calendar, Car } from 'lucide-react';


const departementsSenegal = [
  "Bambey", "Birkilane", "Bounkiling", "Dagana", "Dakar", "Diourbel", "Fatick",
  "Foundiougne", "Gossas", "Guédiawaye", "Kaffrine", "Kaolack", "Kanel", "Kédougou",
  "Keur Massar", "Kolda", "Koungheul", "Louga", "Malem Hoddar", "Matam", "Mbacké",
  "Mbour", "Nioro du Rip", "Oussouye", "Pikine", "Podor", "Pout", "Ranérou", "Rufisque",
  "Saint-Louis", "Salémata", "Sédhiou", "Tambacounda", "Thiès", "Tivaouane", "Vélingara",
  "Ziguinchor"
];

const covoituragesDisponibles = [
  {
    id: 1,
    depart: 'Dakar',
    lieuDepart: 'Station Liberté 6',
    arrivee: 'Saint-Louis',
    lieuArrivee: 'Gare centrale de Saint-Louis',
    heureDepart: '08:00',
    heureArrivee: '11:30',
    date: '2025-10-16',
    duree: '3h30',
    places: 3,
    prix: 7000,
    chauffeur: {
      nom: 'Mamadou Ndiaye',
      telephone: '77 123 45 67',
      voiture: 'Toyota Corolla',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  },
  {
    id: 2,
    depart: 'Thiès',
    lieuDepart: 'Gare routière de Thiès',
    arrivee: 'Dakar',
    lieuArrivee: 'Station Petersen',
    heureDepart: '09:30',
    heureArrivee: '11:00',
    date: '2025-10-17',
    duree: '1h30',
    places: 2,
    prix: 4000,
    chauffeur: {
      nom: 'Fatou Diop',
      telephone: '78 987 65 43',
      voiture: 'Peugeot 308',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg'
    }
  },
  {
    id: 3,
    depart: 'Dakar',
    lieuDepart: 'Station Grand Yoff',
    arrivee: 'Kaolack',
    lieuArrivee: 'Gare routière de Kaolack',
    heureDepart: '07:00',
    heureArrivee: '10:00',
    date: '2025-10-18',
    duree: '3h00',
    places: 4,
    prix: 6000,
    chauffeur: {
      nom: 'Ibrahima Fall',
      telephone: '76 555 12 34',
      voiture: 'Renault Clio',
      photo: 'https://randomuser.me/api/portraits/men/45.jpg'
    }
  },
  {
    id: 4,
    depart: 'Saint-Louis',
    lieuDepart: 'Gare routière de Saint-Louis',
    arrivee: 'Dakar',
    lieuArrivee: 'Station Colobane',
    heureDepart: '15:00',
    heureArrivee: '18:30',
    date: '2025-10-19',
    duree: '3h30',
    places: 1,
    prix: 7000,
    chauffeur: {
      nom: 'Awa Ba',
      telephone: '70 222 33 44',
      voiture: 'Hyundai i20',
      photo: 'https://randomuser.me/api/portraits/women/68.jpg'
    }
  },
  {
    id: 5,
    depart: 'Kaolack',
    lieuDepart: 'Gare centrale de Kaolack',
    arrivee: 'Fatick',
    lieuArrivee: 'Station Fatick',
    heureDepart: '12:00',
    heureArrivee: '13:30',
    date: '2025-10-20',
    duree: '1h30',
    places: 2,
    prix: 2500,
    chauffeur: {
      nom: 'Cheikh Sarr',
      telephone: '77 333 22 11',
      voiture: 'Citroën C3',
      photo: 'https://randomuser.me/api/portraits/men/50.jpg'
    }
  },
  {
    id: 6,
    depart: 'Ziguinchor',
    lieuDepart: 'Gare routière de Ziguinchor',
    arrivee: 'Kolda',
    lieuArrivee: 'Gare routière de Kolda',
    heureDepart: '06:30',
    heureArrivee: '09:30',
    date: '2025-10-21',
    duree: '3h00',
    places: 3,
    prix: 8000,
    chauffeur: {
      nom: 'Moussa Diagne',
      telephone: '78 444 55 66',
      voiture: 'Toyota Yaris',
      photo: 'https://randomuser.me/api/portraits/men/60.jpg'
    }
  }
];

const Covoiturage: React.FC = () => {
  const [search, setSearch] = useState({
    depart: '',
    arrivee: '',
    heureDepart: '',
  });
  const [criteria, setCriteria] = useState({
    depart: '',
    arrivee: '',
    heureDepart: '',
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCriteria(search);
  };

  const covoituragesFiltres = covoituragesDisponibles.filter((covoit) => {
    const departMatch = criteria.depart === '' || covoit.depart === criteria.depart;
    const arriveeMatch = criteria.arrivee === '' || covoit.arrivee === criteria.arrivee;
    const heureMatch = criteria.heureDepart === '' || covoit.heureDepart === criteria.heureDepart;
    return departMatch && arriveeMatch && heureMatch;
  });

  // Fonction pour afficher la date au format français
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Covoiturages disponibles</h1>
      {/* Barre de recherche */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="depart"
            value={search.depart}
            onChange={handleSearchChange}
            className="input bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Lieu de départ</option>
            {departementsSenegal.map((dep) => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>
          <select
            name="arrivee"
            value={search.arrivee}
            onChange={handleSearchChange}
            className="input bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Lieu d'arrivée</option>
            {departementsSenegal.map((dep) => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>
          <input
            type="time"
            name="heureDepart"
            value={search.heureDepart}
            onChange={handleSearchChange}
            className="input bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Heure de départ"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded transition"
          >
            Rechercher
          </button>
        </div>
      </form>

      {/* Liste des covoiturages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {covoituragesFiltres.length === 0 ? (
          <div className="text-gray-500 col-span-full">Aucun covoiturage trouvé.</div>
        ) : (
          covoituragesFiltres.map((covoit) => (
            <div
              key={covoit.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <img
                    src={covoit.chauffeur.photo}
                    alt={covoit.chauffeur.nom}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                  />
                  <span className="font-bold text-lg">{covoit.chauffeur.nom}</span>
                </div>
                <span className="text-blue-600 font-bold text-xl">{covoit.prix.toLocaleString()} FCFA</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <Car className="w-4 h-4 mr-1" />
                {covoit.chauffeur.voiture} • {covoit.chauffeur.telephone}
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <span>{covoit.depart} <span className="text-blue-500">→</span> {covoit.arrivee}</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                {/* Départ */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
                    <span className="font-semibold">{covoit.depart}</span>
                  </div>
                  <span className="font-semibold">{covoit.heureDepart}</span>
                </div>
                <div className="flex items-center text-gray-500 text-xs mb-1 ml-6">
                  <MapPin className="w-3 h-3 mr-1" />
                  {covoit.lieuDepart}
                </div>
                <div className="flex items-center text-gray-500 text-xs ml-6 mb-1">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(covoit.date)}
                </div>
                {/* Arrivée */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-500 inline-block"></span>
                    <span className="font-semibold">{covoit.arrivee}</span>
                  </div>
                  <span className="font-semibold">{covoit.heureArrivee}</span>
                </div>
                <div className="flex items-center text-gray-500 text-xs mb-1 ml-6">
                  <MapPin className="w-3 h-3 mr-1" />
                  {covoit.lieuArrivee}
                </div>
                <div className="flex items-center text-gray-500 text-xs ml-6">
                  <Clock className="w-3 h-3 mr-1" />
                  Durée : {covoit.duree}
                </div>
              </div>
              {/* Footer */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center text-gray-500 text-sm">
                  <Users className="w-4 h-4 mr-1" />
                  {covoit.places} place{covoit.places > 1 ? "s" : ""} disponibles
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded flex items-center gap-2 transition">
                  <ChevronRight className="w-5 h-5" />
                  Réserver
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Covoiturage;