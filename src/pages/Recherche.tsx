import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FormulaireRecherche from '../composants/FormulaireRecherche';
import CarteTrajet from '../composants/CarteTrajet';
import { trajetsAPI } from '../services/api';

interface Trajet {
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

const Recherche: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [depart, setDepart] = useState(searchParams.get('depart') || '');
  const [arrivee, setArrivee] = useState(searchParams.get('arrivee') || '');
  const [date, setDate] = useState(searchParams.get('date') || '');

  const [trajets, setTrajets] = useState<Trajet[]>([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const rechercherTrajets = async () => {
      setChargement(true);

      try {
        const response = await trajetsAPI.rechercher(depart, arrivee, date);

        if (Array.isArray(response.data)) {
          setTrajets(response.data);
        } else {
          console.error('Les données retournées ne sont pas un tableau :', response.data);
          setTrajets([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des trajets :', error);
        setTrajets([]);
      } finally {
        setChargement(false);
      }
    };

    rechercherTrajets();
  }, [depart, arrivee, date]);

  const trajetsFiltres = Array.isArray(trajets)
    ? trajets.filter((trajet) => {
        if (trajet.prix > 10000) return false;
        return true;
      })
    : [];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">{t('recherche.titre', 'Résultats de recherche')}</h1>
        <FormulaireRecherche
          depart={depart}
          setDepart={setDepart}
          arrivee={arrivee}
          setArrivee={setArrivee}
          date={date}
          setDate={setDate}
        />
        {chargement ? (
          <p>{t('recherche.chargement', 'Chargement...')}</p>
        ) : trajetsFiltres.length === 0 ? (
          <p>{t('recherche.aucunResultat', 'Aucun trajet trouvé.')}</p>
        ) : (
          <div>
            {trajetsFiltres.map((trajet) => (
              <CarteTrajet key={trajet.id} {...trajet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recherche;