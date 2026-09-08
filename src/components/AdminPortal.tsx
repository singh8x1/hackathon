import React from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { HackathonState, UserProfile } from '../types';
import { Settings, PlayCircle, StopCircle, Lock, Unlock, Users, ShieldAlert } from 'lucide-react';

interface AdminPortalProps {
  hackathonState: HackathonState;
  currentUser: UserProfile;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ hackathonState, currentUser }) => {
  if (currentUser.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-400">
        <ShieldAlert className="w-12 h-12 mb-4 text-rose-500/50" />
        <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
        <p>You do not have administrative privileges.</p>
      </div>
    );
  }

  const toggleHackathon = async () => {
    try {
      await setDoc(doc(db, 'settings', 'global'), {
        hackathonStarted: !hackathonState.hackathonStarted
      }, { merge: true });
    } catch (e) {
      console.error('Failed to toggle hackathon state', e);
      alert('Failed to update state.');
    }
  };

  const toggleSubmissions = async () => {
    try {
      await setDoc(doc(db, 'settings', 'global'), {
        submissionsOpen: !hackathonState.submissionsOpen
      }, { merge: true });
    } catch (e) {
      console.error('Failed to toggle submissions state', e);
      alert('Failed to update state.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
          <Settings className="w-6 h-6 text-rose-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Admin Control Panel</h2>
          <p className="text-slate-400">Manage global hackathon state and submission windows</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hackathon Status Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between h-48">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                Hackathon Event Status
              </h3>
              <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider ${
                hackathonState.hackathonStarted 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                {hackathonState.hackathonStarted ? 'Live' : 'Paused / Pre-event'}
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Controls whether the main platform (datasets, leaderboard, gallery) is visible to participants.
            </p>
          </div>
          <button
            onClick={toggleHackathon}
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-colors ${
              hackathonState.hackathonStarted
                ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
            }`}
          >
            {hackathonState.hackathonStarted ? (
              <><StopCircle className="w-4 h-4" /> End Hackathon</>
            ) : (
              <><PlayCircle className="w-4 h-4" /> Start Hackathon</>
            )}
          </button>
        </div>

        {/* Submissions Window Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between h-48">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Unlock className="w-4 h-4 text-indigo-400" />
                Submissions Window
              </h3>
              <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider ${
                hackathonState.submissionsOpen 
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {hackathonState.submissionsOpen ? 'Accepting Projects' : 'Closed'}
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Controls whether the "Submit Project" button is available for students.
            </p>
          </div>
          <button
            onClick={toggleSubmissions}
            disabled={!hackathonState.hackathonStarted && !hackathonState.submissionsOpen}
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-colors ${
              !hackathonState.hackathonStarted && !hackathonState.submissionsOpen
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : hackathonState.submissionsOpen
                  ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]'
            }`}
          >
            {hackathonState.submissionsOpen ? (
              <><Lock className="w-4 h-4" /> Close Submissions</>
            ) : (
              <><Unlock className="w-4 h-4" /> Open Submissions</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
