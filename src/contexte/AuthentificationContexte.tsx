import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient, User } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

type Utilisateur = {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  role: 'utilisateur' | 'compagnie' | 'admin';
  photo?: string;
};

type EtatAuthentification = {
  estConnecte: boolean;
  utilisateur: Utilisateur | null;
  chargement: boolean;
  erreur: string | null;
};

type ContexteAuthentification = {
  etatAuthentification: EtatAuthentification;
  connexion: (email: string, motDePasse: string) => Promise<void>;
  inscription: (nom: string, email: string, telephone: string, motDePasse: string) => Promise<void>;
  deconnexion: () => Promise<void>;
  motDePasseOublie: (email: string) => Promise<void>;
};

const initialEtatAuthentification: EtatAuthentification = {
  estConnecte: false,
  utilisateur: null,
  chargement: true,
  erreur: null,
};

const AuthentificationContexte = createContext<ContexteAuthentification | undefined>(undefined);

export const AuthentificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [etatAuthentification, setEtatAuthentification] = useState<EtatAuthentification>(initialEtatAuthentification);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setEtatAuthentification({
          estConnecte: true,
          utilisateur: {
            id: session.user.id,
            nom: session.user.user_metadata.nom || '',
            email: session.user.email || '',
            telephone: session.user.user_metadata.telephone || '',
            role: session.user.user_metadata.role || 'utilisateur',
          },
          chargement: false,
          erreur: null,
        });
      } else {
        setEtatAuthentification({
          ...initialEtatAuthentification,
          chargement: false,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const connexion = async (email: string, motDePasse: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: motDePasse,
      });

      if (error) throw error;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const inscription = async (nom: string, email: string, telephone: string, motDePasse: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password: motDePasse,
        options: {
          data: {
            nom,
            telephone,
            role: 'utilisateur',
          },
        },
      });

      if (error) throw error;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const deconnexion = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const motDePasseOublie = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <AuthentificationContexte.Provider
      value={{
        etatAuthentification,
        connexion,
        inscription,
        deconnexion,
        motDePasseOublie,
      }}
    >
      {children}
    </AuthentificationContexte.Provider>
  );
};

export const useAuth = (): ContexteAuthentification => {
  const context = useContext(AuthentificationContexte);
  
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthentificationProvider');
  }
  
  return context;
};