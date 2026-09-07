import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  UserPlus, 
  LogIn, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  Github, 
  Globe, 
  Check, 
  ArrowRight,
  UserCheck,
  Lock
} from 'lucide-react';
import { UserProfile } from '../types';
import { AVATAR_COLORS } from '../data/mockUsers';
import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser
}) => {
  const [mode, setMode] = useState<'signin' | 'register'>('register');
  const [loading, setLoading] = useState(false);

  // Registration Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [collegeRollNo, setCollegeRollNo] = useState('');
  const [department, setDepartment] = useState('Computer Science & AI');
  const [yearOfStudy, setYearOfStudy] = useState('3rd Year');
  const [bio, setBio] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [preferredTools, setPreferredTools] = useState<string[]>(['python', 'seaborn', 'matplotlib']);
  const [avatarColor, setAvatarColor] = useState(AVATAR_COLORS[0]);

  // Sign in state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [authError, setAuthError] = useState('');

  if (!isOpen) return null;

  const toggleTool = (tool: string) => {
    if (preferredTools.includes(tool)) {
      setPreferredTools(preferredTools.filter(t => t !== tool));
    } else {
      setPreferredTools([...preferredTools, tool]);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!name.trim() || !collegeRollNo.trim() || !email.trim() || !password) {
      setAuthError('Please fill out Name, College Email, Roll Number, and Password.');
      return;
    }
    
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      
      const newUser: UserProfile = {
        id: userCredential.user.uid,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        collegeRollNo: collegeRollNo.trim().toUpperCase(),
        department,
        yearOfStudy,
        bio: bio.trim() || 'Engineering student participant in EngiViz 2026.',
        githubUrl: githubUrl.trim() || '',
        portfolioUrl: portfolioUrl.trim() || '',
        preferredTools,
        avatarSeed: name.slice(0, 2).toUpperCase(),
        avatarColor,
        joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };

      await setDoc(doc(db, 'users', newUser.id), newUser);
      
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });

      onClose();
    } catch (err: any) {
      setAuthError(err.message || 'Failed to register.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!signInEmail.trim() || !signInPassword) {
      setAuthError('Please enter your email/username and password.');
      return;
    }

    setLoading(true);
    let loginEmail = signInEmail.trim();
    if (loginEmail === 'LycanrocPrime') {
      loginEmail = 'lycanrocprime@admin.gna.edu';
    } else {
      loginEmail = loginEmail.toLowerCase();
    }

    try {
      await signInWithEmailAndPassword(auth, loginEmail, signInPassword);
      onClose();
    } catch (err: any) {
      if (signInEmail.trim() === 'LycanrocPrime' && signInPassword === 'Jagmeet@1998' && (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential' || err.code === 'auth/invalid-login-credentials')) {
        try {
          const cred = await createUserWithEmailAndPassword(auth, loginEmail, signInPassword);
          const adminUser: UserProfile = {
            id: cred.user.uid,
            name: 'Lycanroc Prime (Admin)',
            email: loginEmail,
            role: 'admin',
            collegeRollNo: 'ADMIN',
            department: 'Administration',
            yearOfStudy: 'N/A',
            bio: 'Hackathon Administrator',
            avatarSeed: 'AD',
            avatarColor: 'from-rose-500 to-red-600',
            preferredTools: [],
            joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
          };
          await setDoc(doc(db, 'users', adminUser.id), adminUser);
          
          // Seed the initial global settings if they don't exist
          await setDoc(doc(db, 'settings', 'global'), {
            hackathonStarted: false,
            submissionsOpen: false
          }, { merge: true });

          onClose();
        } catch (createErr: any) {
          setAuthError(createErr.message || 'Failed to initialize admin account.');
        }
      } else {
        setAuthError(err.message || 'Invalid credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              {mode === 'register' ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {mode === 'register' ? 'Register Participant Account' : 'Sign In to EngiViz Portal'}
              </h3>
              <p className="text-xs text-slate-400">
                {mode === 'register'
                  ? 'Create your engineering profile to track and manage submissions.'
                  : 'Access your submitted visualizations and rankings.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 bg-slate-950/50 p-1.5 border-b border-slate-800 text-xs">
          <button
            onClick={() => {
              setMode('register');
              setAuthError('');
            }}
            className={`py-2 rounded-lg font-bold transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Create Account
          </button>
          <button
            onClick={() => {
              setMode('signin');
              setAuthError('');
            }}
            className={`py-2 rounded-lg font-bold transition-all cursor-pointer ${
              mode === 'signin'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-5">
          
          {/* REGISTER MODE */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              
              {/* Name & Roll Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Aarav Patel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    College Roll No. <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ENG-2024-CS042"
                    value={collegeRollNo}
                    onChange={(e) => setCollegeRollNo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* College Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">
                  College Email <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    placeholder="e.g. student@engicollege.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

            {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">
                  Password <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Department & Year of Study */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Department / Branch
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="Computer Science & AI">Computer Science &amp; AI</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics & Comm">Electronics &amp; Comm (ECE)</option>
                    <option value="Electrical Engineering">Electrical Engineering (EEE)</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil & Environmental">Civil &amp; Environmental</option>
                    <option value="Aerospace Engineering">Aerospace Engineering</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Year of Study
                  </label>
                  <select
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="1st Year">1st Year (Freshman)</option>
                    <option value="2nd Year">2nd Year (Sophomore)</option>
                    <option value="3rd Year">3rd Year (Junior)</option>
                    <option value="4th Year">4th Year (Senior)</option>
                    <option value="M.Tech / PG">Postgraduate / M.Tech</option>
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">
                  Short Bio / Interests
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Passionate about machine learning, battery performance datasets, and high-impact Seaborn plots."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
                />
              </div>

              {/* GitHub / Portfolio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <Github className="w-3.5 h-3.5 text-slate-400" />
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/your-username"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    Portfolio / Website
                  </label>
                  <input
                    type="url"
                    placeholder="https://yourportfolio.dev"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Preferred Visualization Tools */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Preferred Tools &amp; Libraries
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {['python', 'matplotlib', 'seaborn', 'plotly', 'powerbi', 'tableau', 'pandas'].map((tool) => {
                    const isSelected = preferredTools.includes(tool);
                    return (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => toggleTool(tool)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{tool}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Avatar Color */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Avatar Theme
                </label>
                <div className="flex items-center gap-2">
                  {AVATAR_COLORS.map((col, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatarColor(col)}
                      className={`w-7 h-7 rounded-full bg-gradient-to-tr ${col} transition-transform cursor-pointer ${
                        avatarColor === col ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3 border-t border-slate-800 flex flex-col items-end gap-3">
                {authError && (
                  <p className="text-xs text-rose-400 font-medium">
                    {authError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{loading ? 'Registering...' : 'Complete Registration & Sign In'}</span>
                </button>
              </div>

            </form>
          )}

          {/* SIGN IN / SWITCH PARTICIPANT PROFILE */}
          {mode === 'signin' && (
            <div className="space-y-6">
              
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">
                    Email Address or Username
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. student@engicollege.edu"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      placeholder="Enter your password"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {authError && (
                  <p className="text-xs text-rose-400 font-medium">
                    {authError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              {/* Active User Indicator */}
              {currentUser && (
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${currentUser.avatarColor} flex items-center justify-center text-white font-bold text-xs`}>
                      {currentUser.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>Currently Signed In as: {currentUser.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {currentUser.collegeRollNo} • {currentUser.department}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
