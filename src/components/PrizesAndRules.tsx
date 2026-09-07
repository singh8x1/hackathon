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
  FileCheck
} from 'lucide-react';
import { PRIZES } from '../data/mockSubmissions';

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
            Compete for cash bounties, trophies, and certifications across both Python and Interactive BI tracks.
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
          Prize Distribution Pool (₹60,000 Total)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRIZES.slice(0, 3).map((prize, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl bg-gradient-to-b ${prize.color} border shadow-xl flex flex-col justify-between relative overflow-hidden`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{prize.trophy}</span>
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-950/60 border border-slate-700">
                    {prize.rank}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-black text-white">{prize.title}</h4>
                  <div className="text-base font-black text-amber-300 font-mono mt-1">
                    {prize.reward}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {prize.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400">
                <span>Awarded on Engineering Day</span>
                <span className="font-semibold text-white">Main Stage</span>
              </div>
            </div>
          ))}
        </div>

        {/* Special Category Awards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {PRIZES.slice(3).map((prize, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl bg-gradient-to-b ${prize.color} border shadow-md flex items-start gap-4`}
            >
              <span className="text-3xl shrink-0 mt-0.5">{prize.trophy}</span>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{prize.title}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-950/80 text-amber-300 font-bold border border-slate-700">
                    {prize.reward.split('+')[0]}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {prize.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4-DIMENSION SCORING RUBRIC */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Standardized Judging Rubric (100 Points Total)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400">Dimension 1</span>
              <span className="text-xs font-mono font-black text-white px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-500/30">
                25 Points
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">Insight Depth &amp; Rigor</h4>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
              <li>Identifies non-obvious engineering correlations</li>
              <li>Addresses the dataset's core challenges</li>
              <li>Calculates sound statistical metrics</li>
              <li>Actionable takeaways for engineering practice</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400">Dimension 2</span>
              <span className="text-xs font-mono font-black text-white px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30">
                25 Points
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">Visual Design &amp; Aesthetics</h4>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
              <li>Optimal color palette &amp; contrast</li>
              <li>Consistent typography &amp; legible scales</li>
              <li>Zero visual clutter and balanced whitespace</li>
              <li>Appropriate chart type for data dimensionality</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400">Dimension 3</span>
              <span className="text-xs font-mono font-black text-white px-2 py-0.5 rounded bg-sky-950/60 border border-sky-500/30">
                25 Points
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">Technical Execution</h4>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
              <li>Effective use of Matplotlib, Seaborn or Plotly</li>
              <li>Robust data preprocessing &amp; normalization</li>
              <li>Clean, commented Python code or DAX models</li>
              <li>Publication-grade export quality (300 DPI)</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">Dimension 4</span>
              <span className="text-xs font-mono font-black text-white px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                25 Points
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">Storytelling &amp; Usability</h4>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
              <li>Intuitive flow from premise to conclusion</li>
              <li>Direct callouts for critical thresholds</li>
              <li>Ease of exploration in interactive dashboards</li>
              <li>Clear executive summary of findings</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SUBMISSION GUIDELINES & SCHEDULE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Rules Checklist */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-indigo-400" />
            Submission Guidelines &amp; Formats
          </h3>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Primary Visual:</strong> Upload your final dashboard or composite visualization in <strong>PNG or JPG format</strong>. Recommended minimum resolution is 1920x1080.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Interactive Visualizations:</strong> If you built your project in Power BI, Tableau, or Streamlit, upload the working file (<code>.pbix</code>, <code>.twbx</code>, <code>.ipynb</code>) or provide a live public link (Tableau Public URL or Power BI web URL).
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Python Focus:</strong> Submissions utilizing Python libraries like <strong>Matplotlib</strong>, <strong>Seaborn</strong>, and <strong>Plotly</strong> are strongly encouraged and qualify for the dedicated ₹5,000 Python Insight Trophy.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Eligibility:</strong> Open to all enrolled undergraduate and postgraduate students from engineering disciplines. Individual participants or teams of up to 3 members.
              </div>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            Engineering Day Event Timeline
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Hackathon Launch &amp; Datasets Released</div>
                <div className="text-slate-400">Main Auditorium &amp; Portal Live</div>
              </div>
              <span className="font-mono text-indigo-400 font-bold">09:00 AM</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Mentorship &amp; Python Lab Hours</div>
                <div className="text-slate-400">Assistance with Matplotlib, Seaborn &amp; Plotly</div>
              </div>
              <span className="font-mono text-sky-400 font-bold">11:30 AM</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Submissions Deadline</div>
                <div className="text-slate-400">Portal locks for student visual uploads</div>
              </div>
              <span className="font-mono text-amber-400 font-bold">03:30 PM</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 to-slate-950 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Final Presentations &amp; Trophy Ceremony</div>
                <div className="text-slate-400">Top 3 Finalists Pitch to Chief Guest &amp; Deans</div>
              </div>
              <span className="font-mono text-emerald-400 font-bold">05:00 PM</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
