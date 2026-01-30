
import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, onLogout }) => {
  const menuItems = [
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      icon: 'fa-chart-pie',
      show: role === UserRole.ADMIN || role === UserRole.MONITORING 
    },
    { 
      path: '/maps', 
      label: 'Geo-Spatial Map', 
      icon: 'fa-map-location-dot',
      show: role === UserRole.ADMIN || role === UserRole.MONITORING 
    },
    { 
      path: '/manage', 
      label: 'Managemen', 
      icon: 'fa-gears',
      show: role === UserRole.ADMIN 
    },
    { 
      path: '/input', 
      label: 'Laporan Lapangan', 
      icon: 'fa-file-circle-plus',
      show: role === UserRole.PETUGAS 
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
            <i className="fa-solid fa-fire-extinguisher"></i>
          </div>
          <span className="text-xl font-bold tracking-tight">ResponSiaga</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 py-4">
        {menuItems.filter(i => i.show).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <i className={`fa-solid ${item.icon} w-5`}></i>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={onLogout}
          className="flex items-center space-x-3 w-full p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors font-medium"
        >
          <i className="fa-solid fa-right-from-bracket w-5"></i>
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
