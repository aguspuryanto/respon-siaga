
import React, { useState } from 'react';

const ManageView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resources' | 'staff' | 'logs'>('resources');

  const resources = [
    { id: 'R001', name: 'Ambulance-01', type: 'Medical', status: 'Deployed', location: 'Hospital A' },
    { id: 'R002', name: 'FireTruck-12', type: 'Rescue', status: 'Available', location: 'Station 4' },
    { id: 'R003', name: 'Digger-04', type: 'Infrastructure', status: 'Maintenance', location: 'Central Depot' },
    { id: 'R004', name: 'Drone-A2', type: 'Surveillance', status: 'Available', location: 'Command Center' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Management</h1>
          <p className="text-slate-500">Configure resources, user access and system logs</p>
        </div>
        <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-colors">
          <i className="fa-solid fa-plus mr-2"></i> Add New Resource
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex border-b border-slate-100 px-6">
          {(['resources', 'staff', 'logs'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-6 text-sm font-bold capitalize border-b-2 transition-colors ${
                activeTab === tab 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                  <th className="pb-4">Resource ID</th>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Category</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Location</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {resources.map((res) => (
                  <tr key={res.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 font-mono text-sm text-slate-500">{res.id}</td>
                    <td className="py-5 text-sm font-bold text-slate-900">{res.name}</td>
                    <td className="py-5">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold">
                        {res.type}
                      </span>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          res.status === 'Available' ? 'bg-emerald-500' : res.status === 'Deployed' ? 'bg-amber-500' : 'bg-slate-300'
                        }`}></span>
                        <span className="text-sm text-slate-600">{res.status}</span>
                      </div>
                    </td>
                    <td className="py-5 text-sm text-slate-500">{res.location}</td>
                    <td className="py-5 text-right">
                      <button className="text-slate-400 hover:text-indigo-600 px-2 transition-colors">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button className="text-slate-400 hover:text-red-600 px-2 transition-colors">
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageView;
