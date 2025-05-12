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
import Admin from './pages/Admin'; // Import de l'interface admin
import Reservation from './pages/Reservation';
import Ticket from './pages/Ticket';
import Dashboard from './pages/Dashboard';
import ConnexionOrganisation from './pages/ConnexionOrganisation';
import InscriptionOrganisation from './pages/InscriptionOrganisation';
import Recherche from './pages/Recherche';

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
            <Route path="/admin" element={<Admin />} /> {/* Route pour l'interface admin */}
            <Route path="/" element={<Accueil />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/dashboard" element={<Dashboard />} /> {/* Route pour le tableau de bord des organisations */}
            <Route path="/connexion-organisation" element={<ConnexionOrganisation />} />
            <Route path="/inscription-organisation" element={<InscriptionOrganisation />} />
            {/* Route pour l'inscription des organisations */}
            <Route path="/recherche" element={<Recherche />} />
            <Route path="*" element={<PageNonTrouvee />} />
          </Routes>
        </Suspense>
      </main>
      <PiedDePage />
    </div>
  );
}

export default App;