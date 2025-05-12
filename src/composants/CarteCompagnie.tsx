import React from 'react';
import { Star, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CarteCompagnieProps {
  id?: string;
  nom?: string;
  logo?: string;
  description?: string;
  note: number;
  avis?: number;
  adresse?: string;
  telephone?: string;
  email?: string;
  siteWeb?: string;
}

const CarteCompagnie: React.FC<CarteCompagnieProps> = ({
  id,
  nom,
  logo,
  description,
  note,
  avis,
  adresse,
  telephone,
  email,
  siteWeb
}) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 flex items-start">
        <img 
          src={logo || 'https://via.placeholder.com/80'} 
          alt={nom} 
          className="w-20 h-20 rounded-lg object-cover mr-4"
        />
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{nom}</h3>
            <div className="flex items-center bg-gray-100 px-2 py-1 rounded-md">
              <Star size={16} className="text-yellow-500 mr-1" />
              <span className="font-medium">{note.toFixed(1)}</span>
              <span className="text-xs text-gray-500 ml-1">({avis})</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={16} className="mr-1 text-gray-400" />
              <span className="truncate">{adresse}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Phone size={16} className="mr-1 text-gray-400" />
              <span>{telephone}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Mail size={16} className="mr-1 text-gray-400" />
              <span className="truncate">{email}</span>
            </div>
            
            {siteWeb && (
              <div className="flex items-center text-sm text-blue-600">
                <ExternalLink size={16} className="mr-1" />
                <a href={siteWeb} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">
                  {siteWeb.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 border-t flex justify-end">
        <Link
          to={`/compagnie/${id}`}
          className="btn-outline text-sm"
        >
          Voir les trajets
        </Link>
      </div>
    </div>
  );
};

export default CarteCompagnie;