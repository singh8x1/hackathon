import React from 'react';
import { 
  Trophy, 
  Award, 
  CheckCircle2, 
  Code2, 
  BarChart, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  HelpCircle,
  FileCheck,
  Gift
} from 'lucide-react';

interface PrizesAndRulesProps {
  onOpenSubmit: () => void;
}

export const PrizesAndRules: React.FC<PrizesAndRulesProps> = ({ onOpenSubmit }) => {
  return (
    <div className="space-y-12">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" />
            Engineering Day 2026 Honors
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Hackathon Prizes &amp; Evaluation Rubric
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            This is a fun, low-stakes game. Have a good time, learn something new, and maybe get a sweet treat at the end!
          </p>
        </div>

        <button
          onClick={onOpenSubmit}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 active:scale-95 transition-all cursor-pointer"
        >
          <span>Submit Your Project Now</span>
        </button>
      </div>

      {/* PRIZE PODIUM CARDS */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          The Ultimate Prize
        </h3>

        <div className="p-8 rounded-2xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-emerald-500/10 border border-slate-700/50 shadow-xl flex flex-col items-center justify-center text-center space-y-4">
          <div className="text-6xl animate-bounce">🍫</div>
          <div>
            <h4 className="text-2xl font-black text-white">A Chocolate! LOL</h4>
            <div className="text-sm font-bold text-slate-400 mt-2 max-w-md mx-auto">
              No ₹60,000 cash pools here. The real prize is the friends we made along the way (and a piece of chocolate). Just keep it fun!
            </div>
          </div>
        </div>
      </div>

      {/* THE RULE BOOK */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-emerald-400" />
          The Rule Book
        </h3>

        <div className="p-6 md:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg max-w-3xl">
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Have Fun & Learn</h4>
                <p className="text-sm text-slate-400 mt-1">
                  This is a low-stakes event meant to spark creativity. Don't stress about being perfect, just try something new and enjoy the process!
                </p>
              </div>
            </li>
            
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Use Any Tool You Like</h4>
                <p className="text-sm text-slate-400 mt-1">
                  Python (Matplotlib, Seaborn, Plotly), Power BI, Tableau, Excel, or even MS Paint. As long as it visualizes data, it's fair game.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Submit One Final Image</h4>
                <p className="text-sm text-slate-400 mt-1">
                  Upload a clear screenshot (PNG or JPG) of your final visualization. You can optionally add a link to an interactive dashboard if you built one.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                4
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Be Kind & Collaborative</h4>
                <p className="text-sm text-slate-400 mt-1">
                  Share tips, help your fellow participants debug their code, and celebrate everyone's work. Good vibes only!
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};
