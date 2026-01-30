
import React from 'react';
import { User } from '../types';

const Header: React.FC<{ user: User }> = ({ user }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-slate-800 md:block hidden">
          Safe City Command Center
        </h2>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <button className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors">
            <i className="fa-solid fa-bell"></i>
          </button>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </div>

        <div className="flex items-center space-x-3 border-l pl-6 border-slate-200">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-900 leading-none">{user.name}</p>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{user.role.replace('_', ' ')}</p>
          </div>
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-10 h-10 rounded-full border-2 border-slate-100 object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
