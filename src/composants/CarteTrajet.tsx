import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MapPin, Calendar, Clock, CreditCard, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CarteTrajetProps {
  id: string;
  compagnie: {
    nom: string;
    logo: string;
    note: number;
  };
  depart: {
    ville: string;
    lieu: string;
    date: string;
    heure: string;
  };
  arrivee: {
    ville: string;
    lieu: string;
    date: string;
    heure: string;
  };
  prix: number;
  placesDisponibles: number;
  duree: string;
  distance: string;
}

const CarteTrajet: React.FC<CarteTrajetProps> = ({
  id,
  compagnie,
  depart,
  arrivee,
  prix,
  placesDisponibles,
  duree,
  distance
}) => {
  const navigate = useNavigate();

  // Calculer la date relative pour l'affichage (ex: dans 3 jours)
  const dateDepart = new Date(depart.date + ' ' + depart.heure);
  const dateRelative = formatDistanceToNow(dateDepart, {
    addSuffix: true,
    locale: fr
  });

  const handleReservation = () => {
    navigate('/reservation', { state: { trajet: { id, compagnie, depart, arrivee, prix } } });
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src={compagnie.logo || 'https://via.placeholder.com/40'} 
              alt={compagnie.nom} 
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div>
              <h3 className="font-semibold">{compagnie.nom}</h3>
              <div className="flex items-center text-sm text-gray-600">
                <Star size={16} className="text-yellow-500 mr-1" />
                <span>{compagnie.note.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-primary font-bold text-xl">{prix.toLocaleString()} FCFA</p>
            <p className="text-sm text-gray-500">{distance}</p>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-600 mt-2">
          <MapPin size={16} className="mr-1 text-gray-400" />
          <span>{depart.ville} → {arrivee.ville}</span>
        </div>  
      </div>

      <div className="p-4">
        <div className="flex items-start mb-4 relative">
          {/* Ligne verticale reliant les points */}
          <div className="absolute left-[10px] top-6 w-0.5 h-16 bg-gray-300"></div>
          
          <div className="flex flex-col items-start">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mb-16">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
          </div>
          
          <div className="ml-4 flex-1">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">{depart.ville}</h4>
                <span className="text-sm text-gray-600">{depart.heure}</span>
              </div>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin size={14} className="mr-1" />
                {depart.lieu}
              </p>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <Calendar size={12} className="mr-1" />
                {new Date(depart.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
                <span className="mx-1">•</span>
                <Clock size={12} className="mr-1" />
                {dateRelative}
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">{arrivee.ville}</h4>
                <span className="text-sm text-gray-600">{arrivee.heure}</span>
              </div>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin size={14} className="mr-1" />
                {arrivee.lieu}
              </p>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <Clock size={12} className="mr-1" />
                Durée: {duree}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <div className="flex items-center text-sm text-gray-600">
            <Users size={16} className="mr-1" />
            <span>{placesDisponibles} places disponibles</span>
          </div>
          <button 
            onClick={handleReservation} 
            className="btn-primary"
          >
            <CreditCard size={16} className="mr-2" />
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarteTrajet;