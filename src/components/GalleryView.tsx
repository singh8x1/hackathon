import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Filter, 
  Trophy, 
  Eye, 
  ExternalLink, 
  Code2, 
  BarChart, 
  Award, 
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Submission } from '../types';

interface GalleryViewProps {
  submissions: Submission[];
  onSelectSubmission: (sub: Submission) => void;
  onOpenJudgePortal: (id: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  submissions,
  onSelectSubmission,
  onOpenJudgePortal
}) => {
  const [filterTrack, setFilterTrack] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = submissions.filter((sub) => {
    if (filterTrack === 'python' && sub.track !== 'python') return false;
    if (filterTrack === 'interactive' && sub.track !== 'interactive') return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return sub.title.toLowerCase().includes(q) || 
             sub.studentName.toLowerCase().includes(q) ||
             sub.department.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Gallery Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            Visual Exhibition Gallery
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Student Visualization Showcase
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Explore submitted charts, statistical dashboards, and interactive models created by engineering students for Engineering Day 2026.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilterTrack('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                filterTrack === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Visuals ({submissions.length})
            </button>
            <button
              onClick={() => setFilterTrack('python')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterTrack === 'python' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Python ({submissions.filter(s => s.track === 'python').length})</span>
            </button>
            <button
              onClick={() => setFilterTrack('interactive')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterTrack === 'interactive' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart className="w-3.5 h-3.5" />
              <span>Interactive BI ({submissions.filter(s => s.track === 'interactive').length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Visualization Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((sub) => (
          <div
            key={sub.id}
            onClick={() => onSelectSubmission(sub)}
            className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/60 transition-all duration-200 overflow-hidden shadow-lg flex flex-col justify-between cursor-pointer"
          >
            {/* Image Preview Box */}
            <div className="relative aspect-[16/9] bg-slate-950 overflow-hidden border-b border-slate-800">
              <img
                src={sub.imageUrl}
                alt={sub.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Badges on preview */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                {sub.rank && (
                  <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-sm border border-slate-700 text-amber-300 text-[11px] font-bold font-mono">
                    #{sub.rank}
                  </span>
                )}
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${
                  sub.track === 'python'
                    ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/40'
                    : 'bg-purple-950/80 text-purple-300 border border-purple-500/40'
                }`}>
                  {sub.track === 'python' ? 'Python Script' : sub.interactiveTool || 'BI Dashboard'}
                </span>
              </div>

              {/* Score pill */}
              <div className="absolute top-2.5 right-2.5">
                {sub.scores.length > 0 ? (
                  <div className="px-2.5 py-0.5 rounded-md bg-emerald-950/85 backdrop-blur-sm border border-emerald-500/40 text-emerald-300 text-xs font-black font-mono">
                    {sub.averageScore.toFixed(1)} / 100
                  </div>
                ) : (
                  <div className="px-2 py-0.5 rounded-md bg-slate-950/80 text-slate-400 text-[10px] font-medium border border-slate-700">
                    Pending
                  </div>
                )}
              </div>

              {/* Hover overlay button */}
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-lg">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Project</span>
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 line-clamp-1">
                  {sub.datasetTitle}
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                  {sub.title}
                </h3>
                
                {/* Insight quote */}
                <p className="text-xs text-slate-300 line-clamp-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  "{sub.keyInsights[0]}"
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-200 text-xs">{sub.studentName}</div>
                  <div className="text-[11px] text-slate-400">{sub.department}</div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenJudgePortal(sub.id);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white text-indigo-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Score Project
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
