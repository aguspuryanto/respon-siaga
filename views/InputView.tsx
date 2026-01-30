
import React, { useState } from 'react';
import { User } from '../types';
import { analyzeDisasterReport } from '../services/geminiService';

const InputView: React.FC<{ user: User }> = ({ user }) => {
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleAnalyze = async () => {
    if (!description.trim()) return;
    setIsAnalyzing(true);
    const result = await analyzeDisasterReport(description);
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, send to backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDescription('');
      setAnalysisResult(null);
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Incident Reporting</h1>
        <p className="text-slate-500">Submit new reports directly from the field</p>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-3xl text-center animate-in zoom-in duration-300">
          <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg shadow-emerald-500/20">
            <i className="fa-solid fa-check"></i>
          </div>
          <h2 className="text-xl font-bold text-emerald-900">Laporan Terkirim</h2>
          <p className="text-emerald-600 mt-2">Pusat komando telah menerima data Anda. Tetap aman di lapangan.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Detailed Situation Report</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what's happening (e.g. Flood depth 1m, 2 houses damaged, needs boat evacuation)..."
                className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none text-slate-800"
                required
              />
              <p className="text-[10px] text-slate-400 mt-2 italic">* Minimum 20 characters for AI analysis</p>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing || description.length < 20}
                className="flex-1 bg-white border border-indigo-600 text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isAnalyzing ? (
                  <><i className="fa-solid fa-circle-notch animate-spin mr-2"></i> Analyzing Situation...</>
                ) : (
                  <><i className="fa-solid fa-wand-magic-sparkles mr-2"></i> Smart Analysis</>
                )}
              </button>
            </div>
          </div>

          {analysisResult && (
            <div className="bg-indigo-900 text-white p-6 rounded-3xl shadow-xl space-y-4 animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center space-x-3 text-indigo-200 mb-2">
                <i className="fa-solid fa-brain"></i>
                <span className="text-[10px] font-black uppercase tracking-widest">AI Command Insight</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <p className="text-[10px] uppercase font-bold text-indigo-300 mb-1">Impact Level</p>
                  <p className="text-lg font-bold">{analysisResult.impactLevel}</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <p className="text-[10px] uppercase font-bold text-indigo-300 mb-1">Priority Score</p>
                  <p className="text-lg font-bold">{analysisResult.priorityScore} / 10</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-indigo-300 mb-2">Required Resources</p>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.resourceRequirements.map((res: string, idx: number) => (
                    <span key={idx} className="bg-indigo-500 px-3 py-1 rounded-full text-xs font-medium">
                      {res}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-500 text-white py-4 rounded-xl font-black text-lg hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
                >
                  CONFIRM & DISPATCH REPORT
                </button>
              </div>
            </div>
          )}

          {!analysisResult && (
            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
            >
              Submit Report Manually
            </button>
          )}
        </form>
      )}

      {/* Field Checklist */}
      <div className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-300">
        <h4 className="text-sm font-bold text-slate-700 mb-4">Field Safety Checklist</h4>
        <div className="space-y-3">
          {[
            'Personal Protective Equipment (PPE) Check',
            'Comm-link Signal Strength Check',
            'GPS Location Lock Active',
            'Emergency Extraction Plan Ready'
          ].map((item, i) => (
            <div key={i} className="flex items-center text-slate-600 text-sm">
              <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center mr-3 bg-white">
                <i className="fa-solid fa-check text-[10px] text-emerald-500"></i>
              </div>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputView;
