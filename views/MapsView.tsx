
import React, { useState } from 'react';
import { UserRole, IncidentStatus } from '../types';

interface MapsViewProps {
  role: UserRole;
}

const mockIncidents = [
  { id: '1', type: 'Fire', location: 'Kebun Jeruk, West Jakarta', x: '45%', y: '30%', status: IncidentStatus.CRITICAL },
  { id: '2', type: 'Flood', location: 'Kampung Melayu, East Jakarta', x: '60%', y: '55%', status: IncidentStatus.ACTIVE },
  { id: '3', type: 'Medical', location: 'Setiabudi, South Jakarta', x: '52%', y: '48%', status: IncidentStatus.PENDING },
  { id: '4', type: 'Accident', location: 'Ancol, North Jakarta', x: '48%', y: '15%', status: IncidentStatus.ACTIVE },
];

const MapsView: React.FC<MapsViewProps> = ({ role }) => {
  const [selectedIncident, setSelectedIncident] = useState<any>(null);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Spatial Intelligence</h1>
          <p className="text-slate-500">Live monitoring of incident nodes across the city</p>
        </div>
        <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex space-x-1">
          <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-bold">Satellite</button>
          <button className="px-4 py-2 text-slate-500 rounded-lg text-sm font-medium hover:bg-slate-50">Terrain</button>
          <button className="px-4 py-2 text-slate-500 rounded-lg text-sm font-medium hover:bg-slate-50">Heatmap</button>
        </div>
      </div>

      <div className="flex-1 bg-slate-200 rounded-3xl relative overflow-hidden shadow-inner border border-slate-300">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map/1200/800')] opacity-50 grayscale contrast-125"></div>
        <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>

        {/* Incident Pins */}
        {mockIncidents.map((incident) => (
          <button
            key={incident.id}
            onClick={() => setSelectedIncident(incident)}
            style={{ left: incident.x, top: incident.y }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300`}
          >
            <div className="relative">
              {/* Pulse effect for active items */}
              {incident.status === IncidentStatus.CRITICAL && (
                <div className="absolute -inset-4 bg-red-500/40 rounded-full animate-ping"></div>
              )}
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center shadow-xl border-2 border-white text-white transition-transform group-hover:scale-125
                ${incident.status === IncidentStatus.CRITICAL ? 'bg-red-500' : incident.status === IncidentStatus.ACTIVE ? 'bg-amber-500' : 'bg-slate-500'}
              `}>
                <i className={`fa-solid ${incident.type === 'Fire' ? 'fa-fire' : incident.type === 'Flood' ? 'fa-water' : 'fa-truck-medical'} text-sm`}></i>
              </div>
              
              {/* Tooltip on Hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white px-3 py-1.5 rounded-lg shadow-xl border border-slate-100 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                <p className="text-xs font-bold text-slate-800">{incident.type}</p>
              </div>
            </div>
          </button>
        ))}

        {/* Map Legend */}
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl border border-slate-200/50 w-64">
          <h4 className="text-sm font-bold text-slate-800 mb-3">Map Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center text-xs">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
              <span className="text-slate-600">Critical (Immediate Response)</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
              <span className="text-slate-600">Active (Handling)</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="w-3 h-3 rounded-full bg-slate-500 mr-2"></span>
              <span className="text-slate-600">Standby / Resolved</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex items-center text-xs font-semibold text-slate-500 uppercase tracking-widest">
              <i className="fa-solid fa-satellite mr-2"></i> Lat: -6.2088, Lon: 106.8456
            </div>
          </div>
        </div>

        {/* Selected Incident Detail (Sidebar Style) */}
        {selectedIncident && (
          <div className="absolute top-6 right-6 w-80 bg-white p-6 rounded-3xl shadow-2xl border border-slate-200 animate-in slide-in-from-right duration-300">
            <button 
              onClick={() => setSelectedIncident(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-4 ${
              selectedIncident.status === IncidentStatus.CRITICAL ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
            }`}>
              {selectedIncident.status}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">{selectedIncident.type} Detected</h3>
            <p className="text-sm text-slate-500 mb-6"><i className="fa-solid fa-location-dot mr-2"></i>{selectedIncident.location}</p>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Deployed Units</p>
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/${i + 10}/100`} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">+2</div>
                </div>
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
              Open Full Operation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapsView;
