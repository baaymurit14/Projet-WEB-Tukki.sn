import React, { useState } from 'react';

interface Covoiturage {
  depart: string;
  lieuDepart: string;
  arrivee: string;
  lieuArrivee: string;
  heureDepart: string;
  heureArrivee: string;
  date: string;
  duree: string;
  places: number;
  prix: number;
  chauffeur: {
    nom: string;
    telephone: string;
    voiture: string;
    photo: string;
  };
}

interface Props {
  onAjout: (covoit: Covoiturage) => void;
}

const AjoutCovoiturage: React.FC<Props> = ({ onAjout }) => {
  const [form, setForm] = useState<Covoiturage>({
    depart: '',
    lieuDepart: '',
    arrivee: '',
    lieuArrivee: '',
    heureDepart: '',
    heureArrivee: '',
    date: '',
    duree: '',
    places: 1,
    prix: 0,
    chauffeur: {
      nom: '',
      telephone: '',
      voiture: '',
      photo: 'https://randomuser.me/api/portraits/lego/1.jpg'
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('chauffeur.')) {
      setForm({
        ...form,
        chauffeur: {
          ...form.chauffeur,
          [name.replace('chauffeur.', '')]: value
        }
      });
    } else if (name === 'places' || name === 'prix') {
      setForm({ ...form, [name]: Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAjout(form);
    setForm({
      depart: '',
      lieuDepart: '',
      arrivee: '',
      lieuArrivee: '',
      heureDepart: '',
      heureArrivee: '',
      date: '',
      duree: '',
      places: 1,
      prix: 0,
      chauffeur: {
        nom: '',
        telephone: '',
        voiture: '',
        photo: 'https://randomuser.me/api/portraits/lego/1.jpg'
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <input name="depart" value={form.depart} onChange={handleChange} placeholder="Départ" className="input" required />
      <input name="lieuDepart" value={form.lieuDepart} onChange={handleChange} placeholder="Lieu de départ" className="input" required />
      <input name="arrivee" value={form.arrivee} onChange={handleChange} placeholder="Arrivée" className="input" required />
      <input name="lieuArrivee" value={form.lieuArrivee} onChange={handleChange} placeholder="Lieu d'arrivée" className="input" required />
      <input name="heureDepart" value={form.heureDepart} onChange={handleChange} placeholder="Heure de départ" type="time" className="input" required />
      <input name="heureArrivee" value={form.heureArrivee} onChange={handleChange} placeholder="Heure d'arrivée" type="time" className="input" required />
      <input name="date" value={form.date} onChange={handleChange} placeholder="Date" type="date" className="input" required />
      <input name="duree" value={form.duree} onChange={handleChange} placeholder="Durée" className="input" required />
      <input name="places" value={form.places} onChange={handleChange} placeholder="Places" type="number" min={1} className="input" required />
      <input name="prix" value={form.prix} onChange={handleChange} placeholder="Prix" type="number" min={0} className="input" required />
      <input name="chauffeur.nom" value={form.chauffeur.nom} onChange={handleChange} placeholder="Nom du chauffeur" className="input" required />
      <input name="chauffeur.telephone" value={form.chauffeur.telephone} onChange={handleChange} placeholder="Téléphone du chauffeur" className="input" required />
      <input name="chauffeur.voiture" value={form.chauffeur.voiture} onChange={handleChange} placeholder="Modèle de voiture" className="input" required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded col-span-full">Ajouter le covoiturage</button>
    </form>
  );
};

export default AjoutCovoiturage;