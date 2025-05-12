import axios from 'axios';

// Créer une instance axios avec une URL de base
// Dans un vrai environnement, cette URL serait celle de votre API Laravel
export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs 401 (non autorisé)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/connexion';
    }
    return Promise.reject(error);
  }
);

// Service pour les trajets
export const trajetsAPI = {
  rechercher: (depart: string, destination: string, date: string) => 
    api.get('/trajets/recherche', { params: { depart, destination, date } }),
  
  obtenirDetails: (id: string) => 
    api.get(`/trajets/${id}`),
  
  obtenirItinerairesPopulaires: () => 
    api.get('/trajets/populaires')
};

// Service pour les réservations
export const reservationsAPI = {
  creer: (trajetId: string, sieges: number[], passagers: any[]) => 
    api.post('/reservations', { trajet_id: trajetId, sieges, passagers }),
  
  annuler: (id: string) => 
    api.delete(`/reservations/${id}`),
  
  obtenirMesReservations: () => 
    api.get('/reservations')
};

// Service pour les paiements
export const paiementsAPI = {
  initier: (reservationId: string, methode: string, montant: number) => 
    api.post('/paiements/initier', { reservation_id: reservationId, methode, montant }),
  
  verifier: (paiementId: string) => 
    api.get(`/paiements/${paiementId}/statut`),
  
  obtenirHistorique: () => 
    api.get('/paiements/historique')
};

// Service pour le covoiturage
export const covoiturageAPI = {
  rechercher: (depart: string, destination: string, date: string) => 
    api.get('/covoiturage/recherche', { params: { depart, destination, date } }),
  
  proposer: (trajet: any) => 
    api.post('/covoiturage', trajet),
  
  reserver: (covoiturageId: string, places: number) => 
    api.post('/covoiturage/reservation', { covoiturage_id: covoiturageId, places }),
  
  mesPropositions: () => 
    api.get('/covoiturage/mes-propositions'),
  
  mesDemandes: () => 
    api.get('/covoiturage/mes-demandes')
};

// Service pour les évaluations
export const evaluationsAPI = {
  creer: (trajetId: string, note: number, commentaire: string) => 
    api.post('/evaluations', { trajet_id: trajetId, note, commentaire }),
  
  obtenirParTrajet: (trajetId: string) => 
    api.get(`/evaluations/trajet/${trajetId}`),
  
  obtenirParCompagnie: (compagnieId: string) => 
    api.get(`/evaluations/compagnie/${compagnieId}`)
};

// Services supplémentaires pour les compagnies
export const compagniesAPI = {
  obtenirDetails: (id: string) => 
    api.get(`/compagnies/${id}`),
  
  ajouterTrajet: (trajet: any) => 
    api.post('/compagnies/trajets', trajet),
  
  ajouterBus: (bus: any) => 
    api.post('/compagnies/bus', bus),
  
  obtenirStatistiques: () => 
    api.get('/compagnies/statistiques')
};