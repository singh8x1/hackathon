import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Trophy, 
  Code2, 
  FileUp, 
  Award, 
  Clock, 
  Layers, 
  Sparkles,
  User,
  UserCheck,
  ChevronDown
} from 'lucide-react';
import { UserProfile, HackathonState } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSubmit: () => void;
  submissionCount: number;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  hackathonState: HackathonState;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSubmit,
  submissionCount,
  currentUser,
  onOpenAuthModal,
  hackathonState
}) => {
  // Hackathon deadline countdown (simulate 4h 32m remaining)
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  let navItems = [
    { id: 'datasets', label: 'Datasets & Python', icon: Code2 },
    { id: 'leaderboard', label: 'Live Leaderboard', icon: Trophy },
    { id: 'gallery', label: 'Visual Gallery', icon: Layers },
    { id: 'judging', label: 'Judges Portal', icon: BarChart3 },
    { id: 'prizes', label: 'Prizes & Rubric', icon: Award },
    { id: 'profile', label: 'My Profile', icon: User }
  ];

  if (currentUser?.role === 'admin') {
    navItems.push({ id: 'admin', label: 'Admin Panel', icon: UserCheck });
  }

  if (!hackathonState.hackathonStarted && currentUser?.role !== 'admin') {
    navItems = navItems.filter(item => item.id === 'profile' || item.id === 'prizes');
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      {/* Top Engineering Day Announcement Bar */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900/60 border-b border-indigo-500/20 px-4 py-1.5 text-xs text-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-3 h-3 mr-1 text-indigo-400 animate-pulse" />
            Engineering Day 2026
          </span>
          <span className="hidden sm:inline text-slate-400 font-medium">
            Annual Inter-Department Data Visualization Championship
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-amber-300 bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-500/30">
            <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-mono font-semibold">
              Submission Window Closes: {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1 text-slate-400">
            <span>Submissions:</span>
            <span className="font-semibold text-emerald-400">{submissionCount} Live</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('datasets')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  EngiViz
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold border border-indigo-500/30">
                  '26
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none">
                DataViz Hackathon • GNA University
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile & Action CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* User Profile Badge / Sign In Trigger */}
            {currentUser ? (
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 p-1 sm:pr-3 rounded-xl border transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-indigo-950/60 border-indigo-500 ring-1 ring-indigo-500/30'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
                title="View Participant Profile & Submission History"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${currentUser.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {currentUser.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left leading-none">
                  <div className="text-xs font-bold text-white truncate max-w-[110px]">
                    {currentUser.name}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {currentUser.collegeRollNo}
                  </span>
                </div>
              </button>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Sign In / Register</span>
              </button>
            )}

            {/* Submit Project Button */}
            <button
              id="submit-project-header-btn"
              onClick={onOpenSubmit}
              disabled={!hackathonState.submissionsOpen}
              className={`relative inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                hackathonState.submissionsOpen
                  ? 'text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-95 cursor-pointer'
                  : 'text-slate-500 bg-slate-800 border border-slate-700 cursor-not-allowed'
              }`}
            >
              <FileUp className="w-4 h-4" />
              <span className="hidden sm:inline">
                {hackathonState.submissionsOpen ? 'Submit Visualization' : 'Closed'}
              </span>
              <span className="sm:hidden">
                {hackathonState.submissionsOpen ? 'Submit' : 'Closed'}
              </span>
              {hackathonState.submissionsOpen && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute -top-0.5 -right-0.5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex items-center justify-between overflow-x-auto py-2 border-t border-slate-800/60 gap-1 text-xs no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg whitespace-nowrap text-[11px] font-semibold cursor-pointer ${
                  isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
