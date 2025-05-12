import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Correction des icônes pour Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Icône pour le bus
const busIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/9463/9463616.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Composant pour déplacer la carte à une position spécifique
const PositionMap: React.FC<{ position: [number, number] }> = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);
  return null;
};

interface Point {
  lat: number;
  lng: number;
  nom: string;
  type: 'depart' | 'arrivee' | 'bus';
  info?: string;
}

interface CarteItineraireProps {
  points: Point[];
  positionBus?: [number, number];
  centrerSur?: [number, number];
  hauteur?: string;
  zoom?: number;
}

const CarteItineraire: React.FC<CarteItineraireProps> = ({
  points,
  positionBus,
  centrerSur = [14.6937, -17.4441], // Par défaut: Dakar
  hauteur = '400px',
  zoom = 7
}) => {
  return (
    <div style={{ height: hauteur, width: '100%' }} className="rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={centrerSur}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marqueurs pour les points de départ et d'arrivée */}
        {points.map((point, index) => (
          <Marker
            key={index}
            position={[point.lat, point.lng]}
            icon={point.type === 'bus' ? busIcon : undefined}
          >
            <Popup>
              <div>
                <h3 className="font-semibold">{point.nom}</h3>
                {point.info && <p>{point.info}</p>}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Si on a passé une position spécifique pour centrer la carte */}
        {centrerSur && <PositionMap position={centrerSur} />}
      </MapContainer>
    </div>
  );
};

export default CarteItineraire;