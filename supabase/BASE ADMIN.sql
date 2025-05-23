-- pour tranformer l'utilisateur en admin
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email text NOT NULL DEFAULT '';

INSERT INTO profiles (id, nom, email, role)
VALUES (
  'e0bcfb57-7ece-4b5f-87e5-b346818c8c7c',
  'Admin Tukki',
  'admin@tukki.sn',
  'admin'
)
ON CONFLICT (id) DO UPDATE
SET role = 'admin', email = EXCLUDED.email;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql STABLE;

-- Donner accès complet à l'admin sur la table covoiturages

ALTER TABLE covoiturages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin accès complet" ON covoiturages;
CREATE POLICY "Admin accès complet" ON covoiturages
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Donner accès complet à l'admin sur la table bus 

ALTER TABLE bus ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin accès complet" ON bus;
CREATE POLICY "Admin accès complet" ON bus
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Donner aaccès complet à l'admin sur les voyages 

ALTER TABLE voyages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin accès complet" ON voyages;
CREATE POLICY "Admin accès complet" ON voyages
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());


--Donner accès complet à l'admin sur les réservations

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin accès complet" ON reservations;
CREATE POLICY "Admin accès complet" ON reservations
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Donner accès complet à l'admin sur les reservations-bus

ALTER TABLE reservations_bus ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin accès complet" ON reservations_bus;
CREATE POLICY "Admin accès complet" ON reservations_bus
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Donner accès complet à l'admin sur les profiles 

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin accès complet" ON profiles;
CREATE POLICY "Admin accès complet" ON profiles
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());


-- Doner accès complet à l'admin sur les vehicules

ALTER TABLE vehicules ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin accès complet" ON vehicules;
CREATE POLICY "Admin accès complet" ON vehicules
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());


-- Donner accès complet à l'admin sur les témoignages 

ALTER TABLE temoignages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin accès complet" ON temoignages;
CREATE POLICY "Admin accès complet" ON temoignages
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Donner accès complet à l'admin sur les position 
CREATE POLICY "Admin accès complet positions"
  ON positions FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );