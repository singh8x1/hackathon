import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Search, 
  Filter, 
  Code2, 
  BarChart, 
  ExternalLink, 
  Eye, 
  Award, 
  ArrowUpDown, 
  Sparkles,
  Layers,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Submission, TrackType } from '../types';
import { KAGGLE_DATASETS } from '../data/datasets';

interface LeaderboardViewProps {
  submissions: Submission[];
  onSelectSubmission: (submission: Submission) => void;
  onOpenJudgePortal: (submissionId: string) => void;
  onOpenSubmitModal: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  submissions,
  onSelectSubmission,
  onOpenJudgePortal,
  onOpenSubmitModal
}) => {
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [selectedDataset, setSelectedDataset] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'score' | 'recent' | 'reviews'>('score');

  // Filter and sort submissions
  const filteredSubmissions = useMemo(() => {
    return submissions
      .filter((sub) => {
        // Track filter
        if (selectedTrack === 'python' && sub.track !== 'python') return false;
        if (selectedTrack === 'interactive' && sub.track !== 'interactive') return false;
        // Dataset filter
        if (selectedDataset !== 'all' && sub.datasetId !== selectedDataset) return false;
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = sub.title.toLowerCase().includes(q);
          const matchStudent = sub.studentName.toLowerCase().includes(q) || (sub.teamMembers && sub.teamMembers.some(m => m.toLowerCase().includes(q))) || (sub.teamName && sub.teamName.toLowerCase().includes(q));
          const matchRoll = sub.collegeRollNo.toLowerCase().includes(q);
          const matchDept = sub.department.toLowerCase().includes(q);
          if (!matchTitle && !matchStudent && !matchRoll && !matchDept) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'score') {
          return b.averageScore - a.averageScore;
        }
        if (sortBy === 'reviews') {
          return b.scores.length - a.scores.length;
        }
        // Recent
        return b.id.localeCompare(a.id);
      });
  }, [submissions, selectedTrack, selectedDataset, searchQuery, sortBy]);

  // Top 3 Podium winners (from all scored submissions)
  const topThree = useMemo(() => {
    const scored = [...submissions].sort((a, b) => b.averageScore - a.averageScore);
    return {
      first: scored[0] || null,
      second: scored[1] || null,
      third: scored[2] || null
    };
  }, [submissions]);

  return (
    <div className="space-y-8">
      
      {/* Leaderboard Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" />
            Engineering Day 2026 Standings
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Live Hackathon Leaderboard
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Rankings update dynamically in real time as the faculty and industry judging panel reviews participant submissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSubmitModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 active:scale-95 transition-all cursor-pointer"
          >
            <span>+ Submit Visualization</span>
          </button>
        </div>
      </div>

      {/* TOP 3 PODIUM DISPLAY */}
      {topThree.first && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          {/* 2nd Place (Silver) */}
          {topThree.second && (
            <div 
              onClick={() => onSelectSubmission(topThree.second!)}
              className="order-2 md:order-1 p-5 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-700/80 shadow-lg hover:border-slate-500 transition-all cursor-pointer flex flex-col justify-between relative group"
            >
              <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-slate-300 text-slate-900 font-black text-xs shadow flex items-center gap-1">
                <span>🥈 2nd Place</span>
              </div>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">{topThree.second.department}</span>
                  <span className="text-xl font-black text-white font-mono">{topThree.second.averageScore.toFixed(1)} pts</span>
                </div>
                <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-indigo-300 transition-colors">
                  {topThree.second.title}
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  {topThree.second.studentName}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 truncate max-w-[170px]">{topThree.second.datasetTitle}</span>
                <span className="text-indigo-400 font-bold group-hover:underline flex items-center gap-1">
                  Inspect <Eye className="w-3 h-3" />
                </span>
              </div>
            </div>
          )}

          {/* 1st Place (Gold Champion) */}
          <div 
            onClick={() => onSelectSubmission(topThree.first!)}
            className="order-1 md:order-2 p-6 rounded-2xl bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border-2 border-amber-500/60 shadow-xl shadow-amber-500/10 hover:border-amber-400 transition-all cursor-pointer flex flex-col justify-between relative group"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1.5">
              <span>🥇 1st Place Champion</span>
            </div>
            
            <div className="mt-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  {topThree.first.department}
                </span>
                <div className="text-right">
                  <div className="text-2xl font-black text-amber-300 font-mono">
                    {topThree.first.averageScore.toFixed(1)}
                  </div>
                  <span className="text-[10px] text-slate-400">Average / 100</span>
                </div>
              </div>

              <h3 className="text-base font-extrabold text-white line-clamp-2 group-hover:text-amber-300 transition-colors">
                {topThree.first.title}
              </h3>
              <p className="text-xs text-slate-200 font-semibold">
                Lead: {topThree.first.studentName}
              </p>
              
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                <span className="text-amber-400 font-bold">Top Insight: </span>
                <span className="line-clamp-2">{topThree.first.keyInsights[0]}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <Clock className="w-3 h-3" />
                <span>{topThree.first.scores.length} Panel Reviews</span>
              </div>
              <span className="text-amber-400 font-bold group-hover:underline flex items-center gap-1">
                View Project <Eye className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 3rd Place (Bronze) */}
          {topThree.third && (
            <div 
              onClick={() => onSelectSubmission(topThree.third!)}
              className="order-3 p-5 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-amber-900/40 shadow-lg hover:border-amber-700/60 transition-all cursor-pointer flex flex-col justify-between relative group"
            >
              <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-amber-700 text-amber-100 font-black text-xs shadow flex items-center gap-1">
                <span>🥉 3rd Place</span>
              </div>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">{topThree.third.department}</span>
                  <span className="text-xl font-black text-white font-mono">{topThree.third.averageScore.toFixed(1)} pts</span>
                </div>
                <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-indigo-300 transition-colors">
                  {topThree.third.title}
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  {topThree.third.studentName}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 truncate max-w-[170px]">{topThree.third.datasetTitle}</span>
                <span className="text-indigo-400 font-bold group-hover:underline flex items-center gap-1">
                  Inspect <Eye className="w-3 h-3" />
                </span>
              </div>
            </div>
          )}

        </div>
      )}

      {/* FILTER & SEARCH BAR */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            id="search-participants-input"
            type="text"
            placeholder="Search by student name, roll number, project title, or branch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 placeholder:text-slate-500"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Track Filter */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setSelectedTrack('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                selectedTrack === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Tracks
            </button>
            <button
              onClick={() => setSelectedTrack('python')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                selectedTrack === 'python' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Python</span>
            </button>
            <button
              onClick={() => setSelectedTrack('interactive')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                selectedTrack === 'interactive' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart className="w-3.5 h-3.5" />
              <span>BI / Tableau</span>
            </button>
          </div>

          {/* Dataset Selector Dropdown */}
          <select
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">All Datasets</option>
            {KAGGLE_DATASETS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title.split(' ')[0]} {d.title.split(' ')[1]}...
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="score">Sort: Highest Score</option>
            <option value="reviews">Sort: Most Reviews</option>
            <option value="recent">Sort: Newest First</option>
          </select>
        </div>
      </div>

      {/* SUBMISSIONS TABLE */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400">
                <th className="py-3.5 px-4 font-bold text-center w-16">Rank</th>
                <th className="py-3.5 px-4 font-bold">Participant &amp; Branch</th>
                <th className="py-3.5 px-4 font-bold">Visualization Title</th>
                <th className="py-3.5 px-4 font-bold">Track &amp; Tools</th>
                <th className="py-3.5 px-4 font-bold">Rubric Avg</th>
                <th className="py-3.5 px-4 font-bold text-center">Reviews</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No submissions matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub, index) => {
                  const rank = index + 1;
                  return (
                    <tr
                      key={sub.id}
                      className="hover:bg-slate-850/60 transition-colors group cursor-pointer"
                      onClick={() => onSelectSubmission(sub)}
                    >
                      {/* Rank */}
                      <td className="py-4 px-4 text-center">
                        <div className="inline-flex items-center justify-center font-mono font-black text-sm">
                          {rank === 1 ? (
                            <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center">
                              1
                            </span>
                          ) : rank === 2 ? (
                            <span className="w-7 h-7 rounded-full bg-slate-400/20 text-slate-200 border border-slate-400/40 flex items-center justify-center">
                              2
                            </span>
                          ) : rank === 3 ? (
                            <span className="w-7 h-7 rounded-full bg-amber-700/20 text-amber-400 border border-amber-700/40 flex items-center justify-center">
                              3
                            </span>
                          ) : (
                            <span className="text-slate-400">#{rank}</span>
                          )}
                        </div>
                      </td>

                      {/* Participant & Branch */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {sub.teamName ? (
                            <span className="flex flex-col">
                              <span>{sub.teamName} <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded ml-1">TEAM</span></span>
                              <span className="text-xs text-slate-400 font-normal mt-0.5">{sub.teamMembers?.join(' & ')}</span>
                            </span>
                          ) : (
                            sub.studentName
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1">
                          {sub.department} • <span className="font-mono">{sub.yearOfStudy}</span>
                        </div>
                        {(!sub.teamName) && (
                          <div className="text-[10px] font-mono text-slate-500">
                            {sub.collegeRollNo}
                          </div>
                        )}
                      </td>

                      {/* Title & Preview Thumb */}
                      <td className="py-4 px-4 max-w-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={sub.imageUrl}
                            alt={sub.title}
                            className="w-14 h-9 object-cover rounded-md border border-slate-800 bg-slate-950 shrink-0"
                          />
                          <div className="space-y-0.5">
                            <div className="font-semibold text-slate-200 line-clamp-1">
                              {sub.title}
                            </div>
                            <div className="text-[11px] text-slate-400 line-clamp-1">
                              {sub.datasetTitle}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Track & Tool Badges */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {sub.track === 'python' ? (
                            <>
                              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                                Python
                              </span>
                              {sub.pythonLibraries?.map((lib) => (
                                <span key={lib} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                                  {lib}
                                </span>
                              ))}
                            </>
                          ) : (
                            <>
                              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                                Interactive
                              </span>
                              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-purple-300 font-mono text-[10px] uppercase">
                                {sub.interactiveTool}
                              </span>
                            </>
                          )}
                        </div>
                        {sub.specialBadges && sub.specialBadges.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {sub.specialBadges.slice(0, 1).map((b, bIdx) => (
                              <span key={bIdx} className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/30">
                                {b}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>

                      {/* Rubric Score */}
                      <td className="py-4 px-4">
                        {sub.scores.length > 0 ? (
                          <div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-base font-black text-white font-mono">
                                {sub.averageScore.toFixed(1)}
                              </span>
                              <span className="text-[10px] text-slate-400">/ 100</span>
                            </div>
                            <div className="text-[10px] text-emerald-400 font-medium">
                              {sub.averageScore >= 90 ? 'High Distinction' : sub.averageScore >= 80 ? 'Merit' : 'Reviewed'}
                            </div>
                          </div>
                        ) : (
                          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-medium">
                            Pending Review
                          </span>
                        )}
                      </td>

                      {/* Review count */}
                      <td className="py-4 px-4 text-center font-mono">
                        <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                          {sub.scores.length}
                        </span>
                      </td>

                      {/* Action buttons */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => onSelectSubmission(sub)}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="Inspect submission"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onOpenJudgePortal(sub.id)}
                            className="px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 text-xs font-bold transition-all cursor-pointer"
                          >
                            Score
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
