import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const menu = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Trajets', path: '/admin/trajets' },
  { label: 'Réservations', path: '/admin/reservations' },
  { label: 'Utilisateurs', path: '/admin/utilisateurs' },
  { label: 'Chauffeurs', path: '/admin/chauffeurs' },
  { label: 'Témoignages', path: '/admin/temoignages' },
  { label: 'Paramètres', path: '/admin/parametres' },
];

const AdminLayout: React.FC = () => {
  const location = useLocation();
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="font-bold text-2xl p-6 border-b border-blue-800">Admin</div>
        <nav className="flex-1 p-4">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded mb-2 hover:bg-blue-800 transition ${
                location.pathname === item.path ? 'bg-blue-800' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 bg-gray-50 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;