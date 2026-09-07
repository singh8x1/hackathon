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
