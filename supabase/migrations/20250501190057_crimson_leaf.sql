/*
  # Configuration initiale de l'authentification
  
  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - Lié à auth.users
      - `nom` (text) - Nom complet de l'utilisateur
      - `telephone` (text) - Numéro de téléphone
      - `role` (text) - Role de l'utilisateur (utilisateur, compagnie, admin)
      - `created_at` (timestamp) - Date de création
      - `updated_at` (timestamp) - Date de mise à jour
  
  2. Security
    - Enable RLS on profiles table
    - Add policies for authenticated users
*/

-- Création de la table des profils utilisateurs
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  nom text NOT NULL,
  telephone text,
  role text DEFAULT 'utilisateur' CHECK (role IN ('utilisateur', 'compagnie', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activer RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Créer les politiques de sécurité
CREATE POLICY "Les utilisateurs peuvent voir leur propre profil"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Les utilisateurs peuvent mettre à jour leur propre profil"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();