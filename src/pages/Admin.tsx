import React, { useState, useEffect } from 'react';

interface Reservation {
  id: number;
  depart: string;
  arrivee: string;
  heureDepart: string;
  places: number;
  utilisateur: string; // Nom ou email de l'utilisateur
}

const Admin: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Simuler la récupération des données (vous pouvez remplacer par un appel API)
  useEffect(() => {
    const fetchReservations = async () => {
      // Exemple de données simulées
      const data: Reservation[] = [
        {
          id: 1,
          depart: 'Dakar',
          arrivee: 'Saint-Louis',
          heureDepart: '08:00',
          places: 3,
          utilisateur: 'Ousmane BODIAN',
        },
        {
          id: 2,
          depart: 'Thiès',
          arrivee: 'Kaolack',
          heureDepart: '10:30',
          places: 2,
          utilisateur: 'Aicha DIEME',
        },
      ];
      setReservations(data);
    };

    fetchReservations();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Interface Administrateur</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Départ</th>
            <th className="border border-gray-300 px-4 py-2">Arrivée</th>
            <th className="border border-gray-300 px-4 py-2">Heure</th>
            <th className="border border-gray-300 px-4 py-2">Places</th>
            <th className="border border-gray-300 px-4 py-2">Utilisateur</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td className="border border-gray-300 px-4 py-2">{reservation.id}</td>
              <td className="border border-gray-300 px-4 py-2">{reservation.depart}</td>
              <td className="border border-gray-300 px-4 py-2">{reservation.arrivee}</td>
              <td className="border border-gray-300 px-4 py-2">{reservation.heureDepart}</td>
              <td className="border border-gray-300 px-4 py-2">{reservation.places}</td>
              <td className="border border-gray-300 px-4 py-2">{reservation.utilisateur}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;