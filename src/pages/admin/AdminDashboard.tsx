import React from 'react';

const AdminDashboard: React.FC = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded shadow text-center">
        <div className="text-3xl font-bold text-blue-700">120</div>
        <div className="text-gray-500">Trajets</div>
      </div>
      <div className="bg-white p-6 rounded shadow text-center">
        <div className="text-3xl font-bold text-blue-700">350</div>
        <div className="text-gray-500">Réservations</div>
      </div>
      <div className="bg-white p-6 rounded shadow text-center">
        <div className="text-3xl font-bold text-blue-700">80</div>
        <div className="text-gray-500">Utilisateurs</div>
      </div>
      <div className="bg-white p-6 rounded shadow text-center">
        <div className="text-3xl font-bold text-blue-700">12</div>
        <div className="text-gray-500">Chauffeurs</div>
      </div>
    </div>
    {/* Tu pourras ajouter ici des graphiques ou stats avancées */}
  </div>
);

export default AdminDashboard;