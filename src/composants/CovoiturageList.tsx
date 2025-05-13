import React from 'react';

interface Covoiturage {
  depart: string;
  lieuDepart: string;
  arrivee: string;
  lieuArrivee: string;
  heureDepart: string;
  heureArrivee: string;
  date: string;
  duree: string;
  places: number;
  prix: number;
  chauffeur: {
    nom: string;
    telephone: string;
    voiture: string;
    photo: string;
  };
}

interface Props {
  covoiturages: Covoiturage[];
}

const CovoiturageList: React.FC<Props> = ({ covoiturages }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {covoiturages.map((covoit, idx) => (
      <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          <img src={covoit.chauffeur.photo} alt={covoit.chauffeur.nom} className="w-10 h-10 rounded-full object-cover border-2 border-blue-500" />
          <span className="font-bold text-lg">{covoit.chauffeur.nom}</span>
        </div>
        <div className="text-blue-600 font-bold text-xl mb-2">{covoit.prix.toLocaleString()} FCFA</div>
        <div className="text-gray-500 text-sm mb-2">{covoit.chauffeur.voiture} • {covoit.chauffeur.telephone}</div>
        <div className="text-gray-500 text-sm mb-2">{covoit.depart} → {covoit.arrivee}</div>
        <div className="bg-gray-50 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold">{covoit.depart}</span>
            <span className="font-semibold">{covoit.heureDepart}</span>
          </div>
          <div className="text-xs text-gray-500 mb-1">{covoit.lieuDepart}</div>
          <div className="text-xs text-gray-500 mb-1">{covoit.date}</div>
          <div className="flex items-center justify-between mt-2">
            <span className="font-semibold">{covoit.arrivee}</span>
            <span className="font-semibold">{covoit.heureArrivee}</span>
          </div>
          <div className="text-xs text-gray-500 mb-1">{covoit.lieuArrivee}</div>
          <div className="text-xs text-gray-500">Durée : {covoit.duree}</div>
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-2">
          {covoit.places} place{covoit.places > 1 ? "s" : ""} disponibles
        </div>
      </div>
    ))}
  </div>
);

export default CovoiturageList;