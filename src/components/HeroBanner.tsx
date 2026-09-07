import React from 'react';
import { 
  Code2, 
  Trophy, 
  Sparkles, 
  Database, 
  BarChart, 
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  FileCheck
} from 'lucide-react';

interface HeroBannerProps {
  onOpenSubmit: () => void;
  onBrowseDatasets: () => void;
  onViewLeaderboard: () => void;
  totalSubmissions: number;
  submissionsOpen?: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenSubmit,
  onBrowseDatasets,
  onViewLeaderboard,
  totalSubmissions,
  submissionsOpen = true
}) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950 py-10 sm:py-14">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Engineering Day 2026 Hackathon Track</span>
              <span className="text-slate-500">•</span>
              <span className="text-indigo-400 font-semibold">Live Real-Time Scoring</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Data Visualization <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                Championship 2026
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Select an engineering dataset from Kaggle, uncover groundbreaking technical insights, and build compelling visual stories. Focus on <strong className="text-white">creative dashboard designs</strong> and analytical depth.
            </p>

            {/* Core Track Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-indigo-500/30 flex items-start gap-3 shadow-sm">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                    Python Track (Flagship)
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Matplotlib fine control, Seaborn statistical plots &amp; Plotly 3D/hover visuals.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-purple-500/30 flex items-start gap-3 shadow-sm">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 mt-0.5">
                  <BarChart className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                    Interactive BI Track
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Upload .pbix, .twbx or share live Tableau Public &amp; Power BI service links.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                id="hero-submit-cta-btn"
                onClick={onOpenSubmit}
                disabled={!submissionsOpen}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  submissionsOpen
                    ? 'text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 active:scale-95 cursor-pointer'
                    : 'text-slate-500 bg-slate-800 border border-slate-700 cursor-not-allowed'
                }`}
              >
                <span>{submissionsOpen ? 'Submit Your Visualization' : 'Submissions Closed'}</span>
                {submissionsOpen && <ArrowRight className="w-4 h-4" />}
              </button>

              <button
                id="hero-browse-datasets-btn"
                onClick={onBrowseDatasets}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all cursor-pointer"
              >
                <Database className="w-4 h-4 text-indigo-400" />
                <span>Browse Kaggle Datasets</span>
              </button>

              <button
                id="hero-view-leaderboard-btn"
                onClick={onViewLeaderboard}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Live Standings</span>
              </button>
            </div>
          </div>

          {/* Right Metrics & Quick Rules Card */}
          <div className="lg:col-span-5">
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-xl relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-bold text-white">Hackathon Stats</span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30">
                  Just for Fun!
                </span>
              </div>

              {/* Stat Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="text-2xl font-black text-white font-mono">{totalSubmissions}</div>
                  <div className="text-[11px] text-slate-400 font-medium">Submissions Reviewed</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="text-2xl font-black text-indigo-400 font-mono">5</div>
                  <div className="text-[11px] text-slate-400 font-medium">Kaggle Datasets</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="text-2xl font-black text-emerald-400 font-mono">100 pts</div>
                  <div className="text-[11px] text-slate-400 font-medium">Judge Rubric Max</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="text-2xl font-black text-amber-400 font-mono">4</div>
                  <div className="text-[11px] text-slate-400 font-medium">Evaluation Criteria</div>
                </div>
              </div>

              {/* Checklist / Fast Guide */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>PNG / JPG visual snapshot upload required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Upload .pbix / .twbx or provide public dashboard URL</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Emphasis on Python: Matplotlib, Seaborn, Plotly</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Real-time rank updates as judges score submissions</span>
                </div>
              </div>

              {/* Special Badge Callout */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Special Trophy:</span>
                <span className="font-semibold text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                  Best Python Insight Award (1 🍫)
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
