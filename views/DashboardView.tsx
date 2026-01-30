
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';

const dataStats = [
  { name: 'Mon', active: 12, resolved: 8 },
  { name: 'Tue', active: 18, resolved: 14 },
  { name: 'Wed', active: 15, resolved: 20 },
  { name: 'Thu', active: 25, resolved: 18 },
  { name: 'Fri', active: 30, resolved: 25 },
  { name: 'Sat', active: 20, resolved: 28 },
  { name: 'Sun', active: 10, resolved: 12 },
];

const incidentTypes = [
  { name: 'Fire', value: 40, color: '#ef4444' },
  { name: 'Flood', value: 30, color: '#3b82f6' },
  { name: 'Earthquake', value: 15, color: '#f59e0b' },
  { name: 'Medical', value: 15, color: '#10b981' },
];

const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Executive Monitoring</h1>
          <p className="text-slate-500">Real-time status of all ongoing operations</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
            System Live
          </span>
          <button className="bg-white px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
            <i className="fa-solid fa-download mr-2"></i> Report PDF
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Incidents', value: '24', change: '+12%', icon: 'fa-triangle-exclamation', color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Staff Deployed', value: '158', change: '85%', icon: 'fa-users', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Resources Ready', value: '42', change: '-2%', icon: 'fa-truck-medical', color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Avg. Response Time', value: '4.2m', change: '-30s', icon: 'fa-clock', color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <i className={`fa-solid ${stat.icon} text-xl`}></i>
              </div>
              <span className={`text-sm font-bold ${stat.change.startsWith('+') ? 'text-red-500' : 'text-emerald-500'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Incident Frequency (Weekly)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataStats}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="active" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Type Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incidentTypes}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {incidentTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {incidentTypes.map((type, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-3" style={{backgroundColor: type.color}}></span>
                  <span className="text-sm text-slate-600 font-medium">{type.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-800">{type.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
