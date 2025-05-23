import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreditCard, Map, Users, ChevronRight, Star } from 'lucide-react';
import FormulaireRecherche from '../composants/FormulaireRecherche';
import CarteTrajet from '../composants/CarteTrajet';
import SenegalToursLogo from '../assets/images/senegal Tours.png';
import DakarExpressLogo from '../assets/images/Dakar Express.png';
import AfricaToursLogo from '../assets/images/Africa Tours.png';
import homme1 from '../assets/images/homme1.png';
import femme1 from '../assets/images/femme1.png';
import homme2 from '../assets/images/homme2.png';

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

interface Temoignage {
  id: string;
  utilisateur: {
    nom: string;
    photo: string;
  };
  note: number;
  commentaire: string;
  date: string;
}

const Accueil: React.FC = () => {
  const { t } = useTranslation();

  // États pour les champs du formulaire de recherche
  const [depart, setDepart] = useState('');
  const [arrivee, setArrivee] = useState('');
  const [date, setDate] = useState('');

  // États pour les trajets populaires et les témoignages
  const [trajetsPopulaires, setTrajetsPopulaires] = useState<Trajet[]>([]);
  const [temoignages, setTemoignages] = useState<Temoignage[]>([]);

  // Chargement des données simulées pour les trajets populaires et les témoignages
  useEffect(() => {
    const obtenirTrajetsPopulaires = async () => {
      try {
        setTrajetsPopulaires([
          {
            id: '1',
            compagnie: {
              nom: 'Sénégal Tours',
              logo: SenegalToursLogo,
              note: 4.7,
            },
            depart: {
              ville: 'Dakar',
              lieu: 'Gare routière de Dakar',
              date: '2025-10-15',
              heure: '08:30',
            },
            arrivee: {
              ville: 'Saint-Louis',
              lieu: 'Gare routière de Saint-Louis',
              date: '2025-10-15',
              heure: '11:30',
            },
            prix: 5000,
            placesDisponibles: 12,
            duree: '3h00',
            distance: '264 km',
          },
          {
            id: '2',
            compagnie: {
              nom: 'Dakar Express',
              logo: DakarExpressLogo,
              note: 4.5,
            },
            depart: {
              ville: 'Dakar',
              lieu: 'Station Liberté 6',
              date: '2025-10-16',
              heure: '10:00',
            },
            arrivee: {
              ville: 'Thiès',
              lieu: 'Gare centrale de Thiès',
              date: '2025-10-16',
              heure: '11:15',
            },
            prix: 2500,
            placesDisponibles: 8,
            duree: '1h15',
            distance: '72 km',
          },
          {
            id: '3',
            compagnie: {
              nom: 'Africa Tours',
              logo: AfricaToursLogo,
              note: 4.8,
            },
            depart: {
              ville: 'Ziguinchor',
              lieu: 'Gare principale de Ziguinchor',
              date: '2025-10-18',
              heure: '07:00',
            },
            arrivee: {
              ville: 'Dakar',
              lieu: 'Gare routière de Dakar',
              date: '2025-10-18',
              heure: '17:00',
            },
            prix: 15000,
            placesDisponibles: 5,
            duree: '10h00',
            distance: '450 km',
          },
        ]);
      } catch (error) {
        console.error('Erreur lors du chargement des trajets populaires', error);
      }
    };

    const obtenirTemoignages = () => {
      setTemoignages([
        {
          id: '1',
          utilisateur: {
            nom: 'Amadou Diallo',
            photo: homme1
          },
          note: 5,
          commentaire: 'Service impeccable ! Le bus était à l\'heure et très confortable.',
          date: '2025-09-10',
        },
        {
          id: '2',
          utilisateur: {
            nom: 'Fatou Ndiaye',
            photo: femme1
          },
          note: 4,
          commentaire: 'Très bonne expérience avec Tukki. Le trajet était agréable, mais j\'aurais aimé plus de choix de sièges.',
          date: '2025-08-22',
        },
        {
          id: '3',
          utilisateur: {
            nom: 'Cheikh Sarr',
            photo: homme2
          },
          note: 5,
          commentaire: 'Un voyage agréable et une très bonne organisation. Merci !',
          date: '2025-07-15',
        },
      ]);
    };

    obtenirTrajetsPopulaires();
    obtenirTemoignages();
  }, []);

  // Fonction pour gérer la soumission du formulaire de recherche
  const handleRecherche = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recherche effectuée avec :', { depart, arrivee, date });
    // Vous pouvez rediriger ou effectuer une action avec les données de recherche ici
  };

  return (
    <div className="pt-16">
      {/* Section hero */}
      <section
        className="relative bg-blue-900 text-white overflow-hidden"
        style={{
          backgroundImage: 'url("/assets/images/nuages-bleus.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80"></div>

        {/* Animation de bus */}
        <div className="absolute bottom-0 left-0 w-full h-32">
          <div className="bus-animation">
            <img
              src="/assets/images/bus.svg"
              alt="Bus"
              className="w-32 h-auto"
            />
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {t('home.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {t('home.subtitle')}
            </p>
          </div>
          {/* Formulaire de recherche */}
          <FormulaireRecherche
            depart={depart}
            setDepart={setDepart}
            arrivee={arrivee}
            setArrivee={setArrivee}
            date={date}
            setDate={setDate}
          />
        </div>
      </section>

      {/* Section itinéraires populaires */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">{t('home.popularRoutes')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trajetsPopulaires.map((trajet) => (
              <CarteTrajet
                key={trajet.id}
                id={trajet.id}
                compagnie={trajet.compagnie}
                depart={trajet.depart}
                arrivee={trajet.arrivee}
                prix={trajet.prix}
                placesDisponibles={trajet.placesDisponibles}
                duree={trajet.duree}
                distance={trajet.distance}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section témoignages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('home.testimonials')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {temoignages.map((temoignage) => (
              <div key={temoignage.id} className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={temoignage.utilisateur.photo}
                    alt={temoignage.utilisateur.nom}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{temoignage.utilisateur.nom}</h4>
                    <div className="flex items-center">
                      {Array.from({ length: temoignage.note }).map((_, index) => (
                        <Star key={index} className="w-4 h-4 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{temoignage.commentaire}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Accueil;