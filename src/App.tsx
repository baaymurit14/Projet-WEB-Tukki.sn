import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import BarreNavigation from './composants/BarreNavigation';
import PiedDePage from './composants/PiedDePage';
import Chargement from './composants/Chargement';
import Accueil from './pages/Accueil';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Covoiturage from './pages/Covoiturage';
import PageNonTrouvee from './pages/PageNonTrouvee';
import Reservation from './pages/Reservation';
import Ticket from './pages/Ticket';
import Dashboard from './pages/Dashboard';
import ConnexionOrganisation from './pages/ConnexionOrganisation';
import InscriptionOrganisation from './pages/InscriptionOrganisation';
import Recherche from './pages/Recherche';
import PageSuivi from './pages/PageSuivi';

// Imports pour l'admin
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTrajets from './pages/admin/AdminTrajets';
import AdminReservations from './pages/admin/AdminReservations';
import AdminUtilisateurs from './pages/admin/AdminUtilisateurs';
import AdminChauffeurs from './pages/admin/AdminChauffeurs';
import AdminTemoignages from './pages/admin/AdminTemoignages';
import AdminParametres from './pages/admin/AdminParametres';

// Imports pour l'utilisateur
import Profile from './pages/Profile';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <BarreNavigation />
      <main className="flex-grow pt-16">
        <Suspense fallback={<Chargement />}>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/covoiturage" element={<Covoiturage />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/connexion-organisation" element={<ConnexionOrganisation />} />
            <Route path="/inscription-organisation" element={<InscriptionOrganisation />} />
            <Route path="/recherche" element={<Recherche />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/suivi" element={<PageSuivi />} />
            {/* Routes pour l'interface utilisateur */}
            {/* Routes pour l'interface admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="trajets" element={<AdminTrajets />} />
              <Route path="reservations" element={<AdminReservations />} />
              <Route path="utilisateurs" element={<AdminUtilisateurs />} />
              <Route path="chauffeurs" element={<AdminChauffeurs />} />
              <Route path="temoignages" element={<AdminTemoignages />} />
              <Route path="parametres" element={<AdminParametres />} />
            </Route>

            <Route path="*" element={<PageNonTrouvee />} />
          </Routes>
        </Suspense>
      </main>
      <PiedDePage />
    </div>
  );
}

export default App;