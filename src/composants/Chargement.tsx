import React from 'react';

const Chargement: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">Chargement...</p>
    </div>
  );
};

export default Chargement;