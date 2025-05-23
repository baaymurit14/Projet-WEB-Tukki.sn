/*
  # Migration de base pour Tukki.sn (Supabase)
  Cette migration crée une base de données professionnelle pour une application de covoiturage.
  Elle inclut :
    - Table des profils utilisateurs/organisations avec photo
    - Table des véhicules avec photo
    - Table des covoiturages
    - Table des réservations
    - Table des témoignages (avis)
    - Relations, triggers, RLS et policies de sécurité
*/

-- 1. TABLE DES PROFILS (utilisateurs & organisations)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  nom text NOT NULL,
  email text NOT NULL,
  telephone text,
  role text DEFAULT 'utilisateur' CHECK (role IN ('utilisateur', 'compagnie', 'admin')),
  photo text, -- URL de la photo de profil
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. TABLE DES VEHICULES
CREATE TABLE IF NOT EXISTS vehicules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proprietaire_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  marque text NOT NULL,
  modele text NOT NULL,
  immatriculation text,
  photo text, -- URL de la photo du véhicule
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. TABLE DES COVOITURAGES
CREATE TABLE IF NOT EXISTS covoiturages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conducteur_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  vehicule_id uuid REFERENCES vehicules(id) ON DELETE SET NULL,
  depart text NOT NULL,
  lieu_depart text,
  arrivee text NOT NULL,
  lieu_arrivee text,
  date date NOT NULL,
  heure_depart time NOT NULL,
  heure_arrivee time,
  duree text,
  places int NOT NULL,
  prix int NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. TABLE DES RESERVATIONS
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  covoiturage_id uuid NOT NULL REFERENCES covoiturages(id) ON DELETE CASCADE,
  utilisateur_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  statut text DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'confirmee', 'annulee')),
  places int NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 5. TABLE DES TEMOIGNAGES (avis)
CREATE TABLE IF NOT EXISTS temoignages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  utilisateur_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message text NOT NULL,
  note int CHECK (note >= 1 AND note <= 5),
  created_at timestamptz DEFAULT now()
);

-- Table des bus (chaque bus appartient à une compagnie/profil)
CREATE TABLE IF NOT EXISTS bus (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  compagnie_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  nom text NOT NULL,
  marque text,
  modele text,
  immatriculation text,
  capacite int NOT NULL, -- nombre total de places
  photo text, -- URL de la photo du bus
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des voyages de bus (un voyage = un trajet à une date précise)
CREATE TABLE IF NOT EXISTS voyages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bus_id uuid NOT NULL REFERENCES bus(id) ON DELETE CASCADE,
  compagnie_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  depart text NOT NULL,
  lieu_depart text,
  arrivee text NOT NULL,
  lieu_arrivee text,
  date date NOT NULL,
  heure_depart time NOT NULL,
  heure_arrivee time,
  prix int NOT NULL,
  places_restantes int NOT NULL, -- nombre de places restantes
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des réservations de bus
CREATE TABLE IF NOT EXISTS reservations_bus (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  voyage_id uuid NOT NULL REFERENCES voyages(id) ON DELETE CASCADE,
  utilisateur_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  places int NOT NULL,
  statut text DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'confirmee', 'annulee')),
  created_at timestamptz DEFAULT now()
);

-- Table position 
CREATE TABLE IF NOT EXISTS positions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicule_id uuid NOT NULL REFERENCES vehicules(id) ON DELETE CASCADE,
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  type text CHECK (type IN ('bus', 'voiture')),
  updated_at timestamptz DEFAULT now()
);

-- Activer la sécurité RLS sur la table positions
ALTER TABLE positions ENABLE ROW LEVEL SECURITY;

-- Policy : chaque utilisateur peut voir toutes les positions (lecture publique pour le suivi)
CREATE POLICY "Voir toutes les positions"
  ON positions FOR SELECT
  TO authenticated
  USING (true);

-- Policy : chaque utilisateur peut insérer une position pour un véhicule qu'il possède (à adapter selon ta logique)
CREATE POLICY "Ajouter une position pour son véhicule"
  ON positions FOR INSERT
  TO authenticated
  WITH CHECK (
    vehicule_id IN (SELECT id FROM vehicules WHERE proprietaire_id = auth.uid())
  );

-- Policy : chaque utilisateur peut modifier la position de ses propres véhicules
CREATE POLICY "Modifier la position de son véhicule"
  ON positions FOR UPDATE
  TO authenticated
  USING (
    vehicule_id IN (SELECT id FROM vehicules WHERE proprietaire_id = auth.uid())
  );

-- Policy : chaque utilisateur peut supprimer la position de ses propres véhicules
CREATE POLICY "Supprimer la position de son véhicule"
  ON positions FOR DELETE
  TO authenticated
  USING (
    vehicule_id IN (SELECT id FROM vehicules WHERE proprietaire_id = auth.uid())
  );


-- Trigger pour diminuer les places_restantes après une réservation confirmée
CREATE OR REPLACE FUNCTION decrementer_places_restantes()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE voyages
  SET places_restantes = places_restantes - NEW.places
  WHERE id = NEW.voyage_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS reservations_bus_decrement_places ON reservations_bus;
CREATE TRIGGER reservations_bus_decrement_places
AFTER INSERT ON reservations_bus
FOR EACH ROW
EXECUTE FUNCTION decrementer_places_restantes();

-- Sécurité (RLS) pour les bus, voyages et réservations_bus
-- Bus
ALTER TABLE bus ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Voir les bus" ON bus FOR SELECT TO authenticated USING (true);
CREATE POLICY "Gérer ses bus" ON bus FOR ALL TO authenticated USING (compagnie_id = auth.uid());

-- Voyages
ALTER TABLE voyages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Voir les voyages" ON voyages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Créer un voyage" ON voyages FOR INSERT TO authenticated WITH CHECK (compagnie_id = auth.uid());
CREATE POLICY "Modifier ses voyages" ON voyages FOR UPDATE TO authenticated USING (compagnie_id = auth.uid());
CREATE POLICY "Supprimer ses voyages" ON voyages FOR DELETE TO authenticated USING (compagnie_id = auth.uid());

-- Réservations de bus
ALTER TABLE reservations_bus ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Voir ses réservations de bus" ON reservations_bus FOR SELECT TO authenticated USING (utilisateur_id = auth.uid());
CREATE POLICY "Réserver une place" ON reservations_bus FOR INSERT TO authenticated WITH CHECK (utilisateur_id = auth.uid());
CREATE POLICY "Annuler sa réservation de bus" ON reservations_bus FOR DELETE TO authenticated USING (utilisateur_id = auth.uid());

-- Fonction pour augmenter les places_restantes après une annulation de réservation
CREATE OR REPLACE FUNCTION incrementer_places_restantes()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE voyages
  SET places_restantes = places_restantes + OLD.places
  WHERE id = OLD.voyage_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Trigger sur la suppression d'une réservation de bus
DROP TRIGGER IF EXISTS reservations_bus_increment_places ON reservations_bus;
CREATE TRIGGER reservations_bus_increment_places
AFTER DELETE ON reservations_bus
FOR EACH ROW
EXECUTE FUNCTION incrementer_places_restantes();


-- 6. TRIGGERS POUR updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_vehicules_updated_at ON vehicules;
CREATE TRIGGER update_vehicules_updated_at
    BEFORE UPDATE ON vehicules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_covoiturages_updated_at ON covoiturages;
CREATE TRIGGER update_covoiturages_updated_at
    BEFORE UPDATE ON covoiturages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 7. SECURITE : ROW LEVEL SECURITY (RLS) & POLICIES

-- Profils
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Voir son propre profil" ON profiles;
CREATE POLICY "Voir son propre profil"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Mettre à jour son propre profil" ON profiles;
CREATE POLICY "Mettre à jour son propre profil"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Véhicules
ALTER TABLE vehicules ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Voir ses propres véhicules" ON vehicules;
CREATE POLICY "Voir ses propres véhicules"
  ON vehicules FOR SELECT
  TO authenticated
  USING (proprietaire_id = auth.uid());

DROP POLICY IF EXISTS "Gérer ses propres véhicules" ON vehicules;
CREATE POLICY "Gérer ses propres véhicules"
  ON vehicules FOR ALL
  TO authenticated
  USING (proprietaire_id = auth.uid());

-- Covoiturages
ALTER TABLE covoiturages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Voir tous les covoiturages" ON covoiturages;
CREATE POLICY "Voir tous les covoiturages"
  ON covoiturages FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Créer un covoiturage" ON covoiturages;
CREATE POLICY "Créer un covoiturage"
  ON covoiturages FOR INSERT
  TO authenticated
  WITH CHECK (conducteur_id = auth.uid());

DROP POLICY IF EXISTS "Modifier son propre covoiturage" ON covoiturages;
CREATE POLICY "Modifier son propre covoiturage"
  ON covoiturages FOR UPDATE
  TO authenticated
  USING (conducteur_id = auth.uid());

DROP POLICY IF EXISTS "Supprimer son propre covoiturage" ON covoiturages;
CREATE POLICY "Supprimer son propre covoiturage"
  ON covoiturages FOR DELETE 
  TO authenticated
  USING (conducteur_id = auth.uid()); 

-- Réservations
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Voir ses propres réservations" ON reservations;
CREATE POLICY "Voir ses propres réservations"
  ON reservations FOR SELECT
  TO authenticated
  USING (utilisateur_id = auth.uid());

DROP POLICY IF EXISTS "Créer une réservation" ON reservations;
CREATE POLICY "Créer une réservation"
  ON reservations FOR INSERT
  TO authenticated
  WITH CHECK (utilisateur_id = auth.uid());

DROP POLICY IF EXISTS "Modifier sa propre réservation" ON reservations;
CREATE POLICY "Modifier sa propre réservation"
  ON reservations FOR UPDATE
  TO authenticated
  USING (utilisateur_id = auth.uid());

DROP POLICY IF EXISTS "Supprimer sa propre réservation" ON reservations;
CREATE POLICY "Supprimer sa propre réservation"
  ON reservations FOR DELETE 
  TO authenticated 
  USING (utilisateur_id = auth.uid());

-- Témoignages
ALTER TABLE temoignages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Voir tous les témoignages" ON temoignages;
CREATE POLICY "Voir tous les témoignages"
  ON temoignages FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Créer un témoignage" ON temoignages;
CREATE POLICY "Créer un témoignage"
  ON temoignages FOR INSERT
  TO authenticated
  WITH CHECK (utilisateur_id = auth.uid());

DROP POLICY IF EXISTS "Modifier son propre témoignage" ON temoignages;
CREATE POLICY "Modifier son propre témoignage"
  ON temoignages FOR UPDATE
  TO authenticated
  USING (utilisateur_id = auth.uid());

DROP POLICY IF EXISTS "Supprimer son propre témoignage" ON temoignages;
CREATE POLICY "Supprimer son propre témoignage"
  ON temoignages FOR DELETE 
  TO authenticated 
  USING (utilisateur_id = auth.uid());

-- FIN DE MIGRATION
