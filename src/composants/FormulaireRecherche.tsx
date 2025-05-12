import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface FormulaireRechercheProps {
  depart: string;
  setDepart: (value: string) => void;
  arrivee: string;
  setArrivee: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  className?: string;
}

// Liste des régions et départements du Sénégal
const regionsEtDepartements = [
  { region: 'Dakar', departements: ['Dakar', 'Pikine', 'Guédiawaye', 'Rufisque'] },
  { region: 'Thiès', departements: ['Thiès', 'Mbour', 'Tivaouane'] },
  { region: 'Saint-Louis', departements: ['Saint-Louis', 'Dagana', 'Podor'] },
  { region: 'Ziguinchor', departements: ['Ziguinchor', 'Bignona', 'Oussouye'] },
  { region: 'Kaolack', departements: ['Kaolack', 'Guinguinéo', 'Nioro du Rip'] },
  { region: 'Diourbel', departements: ['Diourbel', 'Bambey', 'Mbacké'] },
  { region: 'Fatick', departements: ['Fatick', 'Foundiougne', 'Gossas'] },
  { region: 'Kolda', departements: ['Kolda', 'Vélingara', 'Médina Yoro Foulah'] },
  { region: 'Tambacounda', departements: ['Tambacounda', 'Bakel', 'Goudiry', 'Koumpentoum'] },
  { region: 'Matam', departements: ['Matam', 'Kanel', 'Ranérou-Ferlo'] },
  { region: 'Louga', departements: ['Louga', 'Kébémer', 'Linguère'] },
  { region: 'Kaffrine', departements: ['Kaffrine', 'Malem Hodar', 'Birkelane', 'Koungheul'] },
  { region: 'Sédhiou', departements: ['Sédhiou', 'Bounkiling', 'Goudomp'] },
  { region: 'Kédougou', departements: ['Kédougou', 'Salémata', 'Saraya'] },
];

const FormulaireRecherche: React.FC<FormulaireRechercheProps> = ({
  depart,
  setDepart,
  arrivee,
  setArrivee,
  date,
  setDate,
  className = '',
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeField, setActiveField] = useState<'depart' | 'arrivee' | null>(null);

  // Fonction pour gérer les suggestions dynamiques
  const handleInputChange = (value: string, setValue: (val: string) => void, field: 'depart' | 'arrivee') => {
    setValue(value);
    setActiveField(field); // Active uniquement le champ en cours d'édition

    // Filtrer les suggestions en fonction de la saisie
    const matches: string[] = [];
    regionsEtDepartements.forEach(({ region, departements }) => {
      if (region.toLowerCase().includes(value.toLowerCase())) {
        matches.push(region);
      }
      departements.forEach((departement) => {
        if (departement.toLowerCase().includes(value.toLowerCase())) {
          matches.push(departement);
        }
      });
    });

    setSuggestions(matches);
  };

  // Fonction pour afficher ou masquer les suggestions
  const toggleSuggestions = (field: 'depart' | 'arrivee') => {
    if (activeField === field) {
      setActiveField(null); // Masquer les suggestions si elles sont déjà affichées
    } else {
      setActiveField(field); // Afficher les suggestions pour le champ sélectionné
      const matches: string[] = [];
      regionsEtDepartements.forEach(({ region, departements }) => {
        matches.push(region, ...departements);
      });
      setSuggestions(matches); // Afficher toutes les suggestions
    }
  };

  // Fonction pour sélectionner une suggestion
  const handleSuggestionClick = (suggestion: string, setValue: (val: string) => void) => {
    setValue(suggestion);
    setSuggestions([]); // Masquer les suggestions après sélection
    setActiveField(null); // Désactiver le champ actif
  };

  return (
    <form className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ville de départ */}
        <div className="relative">
          <label htmlFor="depart" className="label">Départ</label>
          <div className="flex items-center relative">
            <input
              type="text"
              id="depart"
              className="input"
              placeholder="Ex: Dakar"
              value={depart}
              onChange={(e) => handleInputChange(e.target.value, setDepart, 'depart')}
              onFocus={() => setActiveField('depart')}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2"
              onClick={() => toggleSuggestions('depart')}
            >
              <ChevronDown size={18} />
            </button>
          </div>
          {activeField === 'depart' && suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion, setDepart)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Ville d'arrivée */}
        <div className="relative">
          <label htmlFor="arrivee" className="label">Arrivée</label>
          <div className="flex items-center relative">
            <input
              type="text"
              id="arrivee"
              className="input"
              placeholder="Ex: Saint-Louis"
              value={arrivee}
              onChange={(e) => handleInputChange(e.target.value, setArrivee, 'arrivee')}
              onFocus={() => setActiveField('arrivee')}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2"
              onClick={() => toggleSuggestions('arrivee')}
            >
              <ChevronDown size={18} />
            </button>
          </div>
          {activeField === 'arrivee' && suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion, setArrivee)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="label">Date</label>
          <input
            type="date"
            id="date"
            className="input text-black bg-white"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
      </div>

      <button type="submit" className="btn-primary w-full mt-6 flex items-center justify-center">
        <Search size={18} className="mr-2" />
        Rechercher
      </button>
    </form>
  );
};

export default FormulaireRecherche;