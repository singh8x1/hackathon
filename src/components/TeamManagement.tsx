import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Check, X, Edit2, Save, Trash2, Clock } from 'lucide-react';
import { UserProfile, Team } from '../types';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';

interface TeamManagementProps {
  currentUser: UserProfile;
}

export const TeamManagement: React.FC<TeamManagementProps> = ({ currentUser }) => {
  const [team, setTeam] = useState<Team | null>(null);
  const [pendingRequests, setPendingRequests] = useState<Team[]>([]);
  const [sentRequests, setSentRequests] = useState<Team[]>([]);
  
  const [inviteRollNo, setInviteRollNo] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [teamNameInput, setTeamNameInput] = useState('');

  useEffect(() => {
    // Query teams where currentUser is creator
    const qCreator = query(collection(db, 'teams'), where('creatorId', '==', currentUser.id));
    const unsubscribeCreator = onSnapshot(qCreator, (snapshot) => {
      const creatorTeams = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Team));
      const accepted = creatorTeams.find(t => t.status === 'accepted');
      if (accepted) {
        setTeam(accepted);
        setSentRequests([]);
      } else {
        setSentRequests(creatorTeams.filter(t => t.status === 'pending'));
        if (!team || team.creatorId !== currentUser.id) {
          // Keep current team if we are invited in an accepted team
        }
      }
    });

    // Query teams where currentUser is invited
    const qInvited = query(collection(db, 'teams'), where('invitedRollNo', '==', currentUser.collegeRollNo));
    const unsubscribeInvited = onSnapshot(qInvited, (snapshot) => {
      const invitedTeams = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Team));
      const accepted = invitedTeams.find(t => t.status === 'accepted');
      if (accepted) {
        setTeam(accepted);
        setPendingRequests([]);
      } else {
        setPendingRequests(invitedTeams.filter(t => t.status === 'pending'));
      }
    });

    return () => {
      unsubscribeCreator();
      unsubscribeInvited();
    };
  }, [currentUser.id, currentUser.collegeRollNo]);

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const rollNo = inviteRollNo.trim().toUpperCase();
    if (!rollNo) return;
    if (rollNo === currentUser.collegeRollNo.toUpperCase()) {
      setError('You cannot invite yourself.');
      return;
    }
    
    setIsInviting(true);
    try {
      // Check if user exists with this roll no
      const usersQuery = query(collection(db, 'users'), where('collegeRollNo', '==', rollNo));
      const userSnap = await getDocs(usersQuery);
      
      let invitedId = '';
      let invitedName = '';
      
      if (!userSnap.empty) {
        const invitedUser = userSnap.docs[0].data() as UserProfile;
        invitedId = invitedUser.id;
        invitedName = invitedUser.name;
      }
      
      // We allow inviting even if the user hasn't registered yet, they can see it when they join.
      
      const newTeam = {
        creatorId: currentUser.id,
        creatorRollNo: currentUser.collegeRollNo,
        creatorName: currentUser.name,
        invitedRollNo: rollNo,
        invitedId,
        invitedName,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      await addDoc(collection(db, 'teams'), newTeam);
      setSuccess(`Invite sent to ${rollNo}!`);
      setInviteRollNo('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsInviting(false);
    }
  };

  const handleAcceptInvite = async (teamId: string) => {
    try {
      await updateDoc(doc(db, 'teams', teamId), {
        status: 'accepted',
        invitedId: currentUser.id,
        invitedName: currentUser.name
      });
      // Delete other pending requests
      for (const t of pendingRequests) {
        if (t.id !== teamId) {
          await deleteDoc(doc(db, 'teams', t.id));
        }
      }
      for (const t of sentRequests) {
        await deleteDoc(doc(db, 'teams', t.id));
      }
    } catch (err) {
      console.error("Error accepting invite:", err);
    }
  };

  const handleDeclineInvite = async (teamId: string) => {
    try {
      await deleteDoc(doc(db, 'teams', teamId));
    } catch (err) {
      console.error("Error declining invite:", err);
    }
  };

  const handleCancelInvite = async (teamId: string) => {
    try {
      await deleteDoc(doc(db, 'teams', teamId));
    } catch (err) {
      console.error("Error canceling invite:", err);
    }
  };

  const handleLeaveTeam = async () => {
    if (!team) return;
    if (confirm('Are you sure you want to leave the team?')) {
      try {
        await deleteDoc(doc(db, 'teams', team.id));
        setTeam(null);
      } catch (err) {
        console.error("Error leaving team:", err);
      }
    }
  };

  const handleUpdateTeamName = async () => {
    if (!team || !teamNameInput.trim()) return;
    try {
      await updateDoc(doc(db, 'teams', team.id), {
        name: teamNameInput.trim()
      });
      setIsEditingName(false);
    } catch (err) {
      console.error("Error updating team name:", err);
    }
  };

  // 1. If currently in an accepted team
  if (team && team.status === 'accepted') {
    const isCreator = team.creatorId === currentUser.id;
    const teammateName = isCreator ? (team.invitedName || team.invitedRollNo) : team.creatorName;
    const teammateRollNo = isCreator ? team.invitedRollNo : team.creatorRollNo;

    return (
      <div className="bg-slate-900/60 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
            <Users className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Your Team</h3>
            <p className="text-sm text-slate-400">Collaborating with {teammateName}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Team Name Section */}
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-400">Team Name</span>
              {!isEditingName ? (
                <button 
                  onClick={() => {
                    setTeamNameInput(team.name || '');
                    setIsEditingName(true);
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
              ) : (
                <button 
                  onClick={handleUpdateTeamName}
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <Save className="w-3 h-3" /> Save
                </button>
              )}
            </div>
            
            {!isEditingName ? (
              <p className="text-lg font-bold text-white">{team.name || <span className="italic text-slate-500">No name set</span>}</p>
            ) : (
              <input
                type="text"
                value={teamNameInput}
                onChange={(e) => setTeamNameInput(e.target.value)}
                placeholder="Enter team name"
                className="w-full bg-slate-900 border border-indigo-500/50 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                autoFocus
              />
            )}
          </div>

          {/* Members Section */}
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
            <span className="text-sm font-semibold text-slate-400 mb-3 block">Members</span>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">{currentUser.name} <span className="text-xs text-slate-500 ml-2">({currentUser.collegeRollNo})</span></span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">You</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">{teammateName} <span className="text-xs text-slate-500 ml-2">({teammateRollNo})</span></span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Teammate</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleLeaveTeam}
            className="text-sm text-rose-400 hover:text-rose-300 flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" /> Leave Team
          </button>
        </div>
      </div>
    );
  }

  // 2. Not in a team, show pending requests and invite form
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
          <Users className="w-5 h-5 text-slate-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Team Management</h3>
          <p className="text-sm text-slate-400">Form a team of up to 2 members</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Col: Invite Form */}
        <div>
          <form onSubmit={handleSendInvite} className="bg-slate-950/50 p-5 rounded-xl border border-slate-800">
            <label className="block text-sm font-semibold text-white mb-2">
              Invite Teammate
            </label>
            <p className="text-xs text-slate-400 mb-4">
              Enter their College Roll Number to send an invitation.
            </p>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={inviteRollNo}
                onChange={(e) => setInviteRollNo(e.target.value)}
                placeholder="e.g. 210001014"
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={isInviting || !inviteRollNo.trim() || sentRequests.length > 0}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Invite
              </button>
            </div>
            {error && <p className="text-rose-400 text-xs mt-2">{error}</p>}
            {success && <p className="text-emerald-400 text-xs mt-2">{success}</p>}
            
            {sentRequests.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-800">
                <span className="text-xs font-semibold text-slate-400 mb-2 block">Sent Invitation</span>
                {sentRequests.map(req => (
                  <div key={req.id} className="flex items-center justify-between bg-slate-900 p-2.5 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span className="text-sm text-white">{req.invitedName || req.invitedRollNo}</span>
                      <span className="text-xs text-slate-500">({req.invitedRollNo})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCancelInvite(req.id)}
                      className="text-xs text-rose-400 hover:text-rose-300"
                    >
                      Cancel
                    </button>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* Right Col: Incoming Requests */}
        <div>
          <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800 h-full">
            <label className="block text-sm font-semibold text-white mb-4">
              Incoming Requests
            </label>
            
            {pendingRequests.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm">
                No pending requests
              </div>
            ) : (
              <div className="space-y-3">
                {pendingRequests.map(req => (
                  <div key={req.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-3 rounded-xl border border-indigo-500/30">
                    <div>
                      <p className="text-sm font-bold text-white">{req.creatorName}</p>
                      <p className="text-xs text-slate-400">Roll No: {req.creatorRollNo}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAcceptInvite(req.id)}
                        className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                      >
                        <Check className="w-4 h-4" /> Accept
                      </button>
                      <button
                        onClick={() => handleDeclineInvite(req.id)}
                        className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                      >
                        <X className="w-4 h-4" /> Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
