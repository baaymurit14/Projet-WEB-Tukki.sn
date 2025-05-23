import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { supabase } from '../contexte/AuthentificationContexte';

type Position = {
  id: string;
  vehicule_id: string;
  lat: number;
  lng: number;
  type: 'bus' | 'voiture';
  updated_at: string;
};

const containerStyle = { width: '100%', height: '500px' };

const MapSuivi = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [userPosition, setUserPosition] = useState<{ lat: number; lng: number } | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // Géolocalisation utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  // Charger les positions initiales
  useEffect(() => {
    const fetchPositions = async () => {
      const { data, error } = await supabase
        .from('positions')
        .select('*');
      if (!error && data) setPositions(data as Position[]);
    };
    fetchPositions();
  }, []);

  // Ecoute en temps réel
  useEffect(() => {
    const channel = supabase
      .channel('positions-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'positions' },
        (payload) => {
          setPositions((prev) => {
            if (payload.eventType === 'INSERT') {
              return [...prev, payload.new as Position];
            }
            if (payload.eventType === 'UPDATE') {
              return prev.map((pos) =>
                pos.id === payload.new.id ? (payload.new as Position) : pos
              );
            }
            if (payload.eventType === 'DELETE') {
              return prev.filter((pos) => pos.id !== payload.old.id);
            }
            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (!isLoaded) return <div>Chargement de la carte...</div>;
  if (positions.length === 0) return <div>Aucune position à afficher</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{
        lat: positions[0].lat,
        lng: positions[0].lng,
      }}
      zoom={10}
    >
      {positions.map((pos) => (
        <Marker
          key={pos.id}
          position={{ lat: pos.lat, lng: pos.lng }}
          icon={pos.type === 'bus' ? '/bus-icon.png' : '/car-icon.png'}
        />
      ))}
      {userPosition && (
        <Marker
          position={userPosition}
          icon="/user-icon.png" // Ajoute une icône personnalisée pour l'utilisateur si tu veux
        />
      )}
    </GoogleMap>
  );
};

export default MapSuivi;