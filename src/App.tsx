import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { DatasetExplorer } from './components/DatasetExplorer';
import { LeaderboardView } from './components/LeaderboardView';
import { GalleryView } from './components/GalleryView';
import { JudgesPortal } from './components/JudgesPortal';
import { PrizesAndRules } from './components/PrizesAndRules';
import { ProfileView } from './components/ProfileView';
import { AuthModal } from './components/AuthModal';
import { SubmissionFormModal } from './components/SubmissionFormModal';
import { SubmissionDetailModal } from './components/SubmissionDetailModal';
import { INITIAL_SUBMISSIONS } from './data/mockSubmissions';
import { INITIAL_USERS } from './data/mockUsers';
import { Submission, JudgeScore, UserProfile } from './types';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, doc, onSnapshot, getDoc, setDoc, writeBatch } from 'firebase/firestore';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // Current active navigation tab
  const [activeTab, setActiveTab] = useState<string>('datasets');

  // Modals state
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [preSelectedDatasetId, setPreSelectedDatasetId] = useState<string | undefined>(undefined);
  const [inspectingSubmission, setInspectingSubmission] = useState<Submission | null>(null);
  const [judgeSelectedSubmissionId, setJudgeSelectedSubmissionId] = useState<string | undefined>(undefined);

  // Sync Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCurrentUser(docSnap.data() as UserProfile);
        } else {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync Submissions
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'submissions'), (snapshot) => {
      const subs: Submission[] = [];
      snapshot.forEach(doc => {
        subs.push(doc.data() as Submission);
      });
      setSubmissions(recalculateRanks(subs));
    });
    return () => unsubscribe();
  }, []);

  // Recalculate ranks whenever scores change
  const recalculateRanks = (subs: Submission[]): Submission[] => {
    const sorted = [...subs].sort((a, b) => b.averageScore - a.averageScore);
    return sorted.map((sub, index) => ({
      ...sub,
      rank: index + 1
    }));
  };

  // Add new submission from student
  const handleNewSubmission = async (newSub: Submission) => {
    try {
      await setDoc(doc(db, 'submissions', newSub.id), newSub);
      setIsSubmitModalOpen(false);
      if (currentUser) {
        setActiveTab('profile');
      } else {
        setActiveTab('leaderboard');
      }
    } catch (e) {
      console.error('Failed to save submission:', e);
      alert('Failed to save submission. Please try again.');
    }
  };

  // Submit judge score
  const handleScoreSubmitted = async (submissionId: string, score: JudgeScore) => {
    const sub = submissions.find(s => s.id === submissionId);
    if (!sub) return;

    const remainingScores = sub.scores.filter(s => s.judgeId !== score.judgeId);
    const newScores = [...remainingScores, score];
    const avg = newScores.reduce((acc, curr) => acc + curr.totalScore, 0) / newScores.length;
    
    const allAwards = Array.from(new Set([
      ...(sub.specialBadges || []),
      ...(score.specialAwards || [])
    ]));

    const updatedSub = {
      ...sub,
      status: 'scored' as const,
      scores: newScores,
      averageScore: avg,
      specialBadges: allAwards
    };

    try {
      await setDoc(doc(db, 'submissions', submissionId), updatedSub);
    } catch (e) {
      console.error('Failed to submit score:', e);
      alert('Failed to submit score. Please try again.');
    }
  };

  // Quick action from dataset card
  const handleSelectDatasetForSubmission = (datasetId: string) => {
    setPreSelectedDatasetId(datasetId);
    setIsSubmitModalOpen(true);
  };

  // Quick jump to judge portal with specific submission pre-selected
  const handleOpenJudgePortalForSubmission = (submissionId: string) => {
    setJudgeSelectedSubmissionId(submissionId);
    setActiveTab('judging');
  };

  // User auth handlers (Auth modal now handles Firebase calls directly)
  const handleSignOutUser = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (e) {
      console.error('Failed to sign out', e);
    }
  };

  const handleUpdateProfile = async (updatedProfile: UserProfile) => {
    try {
      await setDoc(doc(db, 'users', updatedProfile.id), updatedProfile);
      setCurrentUser(updatedProfile);
      
      // We would ideally also batch update all user submissions here with a cloud function,
      // but for this simple version, we'll let existing submissions keep their snapshot.
    } catch (e) {
      console.error('Failed to update profile', e);
    }
  };

  // Reset to default data if user wants fresh start (Seed mock data to Firestore)
  const handleResetData = async () => {
    if (confirm('Seed Firestore with initial benchmark mock data?')) {
      try {
        const batch = writeBatch(db);
        
        // Seed Submissions
        INITIAL_SUBMISSIONS.forEach(sub => {
          const docRef = doc(db, 'submissions', sub.id);
          batch.set(docRef, sub);
        });

        // Seed Users
        INITIAL_USERS.forEach(usr => {
          const docRef = doc(db, 'users', usr.id);
          batch.set(docRef, usr);
        });

        await batch.commit();
        alert('Benchmark data seeded successfully!');
      } catch (e) {
        console.error('Failed to seed data', e);
        alert('Failed to seed data.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSubmit={() => {
          setPreSelectedDatasetId(undefined);
          setIsSubmitModalOpen(true);
        }}
        submissionCount={submissions.length}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Hero Banner (Always shown at top for high-impact hackathon presentation) */}
      <HeroBanner
        onOpenSubmit={() => {
          setPreSelectedDatasetId(undefined);
          setIsSubmitModalOpen(true);
        }}
        onBrowseDatasets={() => setActiveTab('datasets')}
        onViewLeaderboard={() => setActiveTab('leaderboard')}
        totalSubmissions={submissions.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'datasets' && (
          <DatasetExplorer
            onSelectDatasetForSubmission={handleSelectDatasetForSubmission}
          />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardView
            submissions={submissions}
            onSelectSubmission={(sub) => setInspectingSubmission(sub)}
            onOpenJudgePortal={handleOpenJudgePortalForSubmission}
            onOpenSubmitModal={() => {
              setPreSelectedDatasetId(undefined);
              setIsSubmitModalOpen(true);
            }}
          />
        )}

        {activeTab === 'gallery' && (
          <GalleryView
            submissions={submissions}
            onSelectSubmission={(sub) => setInspectingSubmission(sub)}
            onOpenJudgePortal={handleOpenJudgePortalForSubmission}
          />
        )}

        {activeTab === 'judging' && (
          <JudgesPortal
            submissions={submissions}
            selectedSubmissionId={judgeSelectedSubmissionId}
            onScoreSubmitted={handleScoreSubmitted}
            onInspectSubmission={(sub) => setInspectingSubmission(sub)}
          />
        )}

        {activeTab === 'prizes' && (
          <PrizesAndRules
            onOpenSubmit={() => {
              setPreSelectedDatasetId(undefined);
              setIsSubmitModalOpen(true);
            }}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            user={currentUser}
            submissions={submissions}
            onUpdateProfile={handleUpdateProfile}
            onOpenSubmitModal={() => {
              setPreSelectedDatasetId(undefined);
              setIsSubmitModalOpen(true);
            }}
            onSelectSubmission={(sub) => setInspectingSubmission(sub)}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onSignOut={handleSignOutUser}
            onBrowseDatasets={() => setActiveTab('datasets')}
          />
        )}
      </main>

      {/* Submission Form Modal */}
      <SubmissionFormModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitSuccess={handleNewSubmission}
        preSelectedDatasetId={preSelectedDatasetId}
        currentUser={currentUser}
      />

      {/* Auth / Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
      />

      {/* Submission Inspection Detail Modal */}
      <SubmissionDetailModal
        submission={inspectingSubmission}
        onClose={() => setInspectingSubmission(null)}
        onJudgeThisSubmission={handleOpenJudgePortalForSubmission}
      />

      {/* Platform Footer */}
      <footer className="mt-16 border-t border-slate-800 bg-slate-950 py-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black font-mono text-xs">
              EV
            </div>
            <div>
              <span className="font-bold text-white">EngiViz '26</span>
              <p className="text-[11px] text-slate-400">GNA University • Engineering Day Data Visualization Hackathon</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            {currentUser && (
              <span className="text-slate-300">
                Logged in as <strong>{currentUser.name}</strong> ({currentUser.collegeRollNo})
              </span>
            )}
            <span>•</span>
            <span>Powered by Python (Matplotlib, Seaborn, Plotly) &amp; Modern BI</span>
            <span>•</span>
            <button
              onClick={handleResetData}
              className="text-slate-400 hover:text-rose-400 underline transition-colors cursor-pointer"
            >
              Reset Benchmark Data
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
