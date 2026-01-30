
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { UserRole, User } from './types';
import DashboardView from './views/DashboardView';
import MapsView from './views/MapsView';
import ManageView from './views/ManageView';
import InputView from './views/InputView';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Mock initial login
  useEffect(() => {
    // For demo purposes, we don't have a real login, 
    // but the app should start with a role selection.
  }, []);

  const handleLogout = () => setCurrentUser(null);

  if (!currentUser) {
    return <LoginScreen onSelectRole={(user) => setCurrentUser(user)} />;
  }

  return (
    <HashRouter>
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        <Sidebar role={currentUser.role} onLogout={handleLogout} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header user={currentUser} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <Routes>
              {/* Monitoring & Admin access */}
              {(currentUser.role === UserRole.MONITORING || currentUser.role === UserRole.ADMIN) && (
                <>
                  <Route path="/dashboard" element={<DashboardView />} />
                  <Route path="/maps" element={<MapsView role={currentUser.role} />} />
                </>
              )}

              {/* Admin only access */}
              {currentUser.role === UserRole.ADMIN && (
                <Route path="/manage" element={<ManageView />} />
              )}

              {/* Field Officer only access */}
              {currentUser.role === UserRole.PETUGAS && (
                <Route path="/input" element={<InputView user={currentUser} />} />
              )}

              {/* Fallback routing */}
              <Route 
                path="*" 
                element={
                  <Navigate to={
                    currentUser.role === UserRole.PETUGAS ? "/input" : "/dashboard"
                  } />
                } 
              />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

const LoginScreen: React.FC<{ onSelectRole: (u: User) => void }> = ({ onSelectRole }) => {
  const roles = [
    { 
      role: UserRole.ADMIN, 
      label: 'Administrator', 
      desc: 'Full system control, management & mapping',
      icon: 'fa-user-shield',
      color: 'bg-indigo-600'
    },
    { 
      role: UserRole.PETUGAS, 
      label: 'Petugas Lapangan', 
      desc: 'Field incident reporting & resource updates',
      icon: 'fa-person-hiking',
      color: 'bg-emerald-600'
    },
    { 
      role: UserRole.MONITORING, 
      label: 'Tim Monitoring', 
      desc: 'Real-time dashboard & spatial visualization',
      icon: 'fa-desktop',
      color: 'bg-amber-600'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-600 text-white shadow-xl mb-4">
            <i className="fa-solid fa-house-fire text-4xl"></i>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">ResponSiaga</h1>
          <p className="text-slate-600">Disaster Management System</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((item) => (
            <button
              key={item.role}
              onClick={() => onSelectRole({ 
                id: Math.random().toString(), 
                name: `Demo ${item.label}`, 
                role: item.role, 
                avatar: `https://picsum.photos/seed/${item.role}/200` 
              })}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all group text-left"
            >
              <div className={`w-14 h-14 rounded-xl ${item.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <i className={`fa-solid ${item.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{item.label}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
              <div className="mt-6 flex items-center text-indigo-600 font-semibold text-sm">
                Enter Dashboard <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
