
import React from 'react';
import { CloseIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-md mx-auto p-4 flex items-center justify-between">
        <button className="text-slate-600 hover:text-slate-900">
          <CloseIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-slate-800">Collect Samples</h1>
        <div className="w-6"></div> {/* Spacer */}
      </div>
    </header>
  );
};

export default Header;
