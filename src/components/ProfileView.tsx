import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  User, 
  Edit3, 
  Save, 
  X, 
  Trophy, 
  Award, 
  CheckCircle2, 
  Github, 
  Globe, 
  Mail, 
  Hash, 
  Building2, 
  Calendar, 
  Sparkles, 
  Code2, 
  BarChart, 
  Eye, 
  ExternalLink, 
  FileCode, 
  PlusCircle, 
  Check,
  LogOut,
  UserCheck
} from 'lucide-react';
import { UserProfile, Submission } from '../types';
import { AVATAR_COLORS } from '../data/mockUsers';

interface ProfileViewProps {
  user: UserProfile | null;
  submissions: Submission[];
  onUpdateProfile: (updated: UserProfile) => void;
  onOpenSubmitModal: () => void;
  onSelectSubmission: (sub: Submission) => void;
  onOpenAuthModal: () => void;
  onSignOut: () => void;
  onBrowseDatasets: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  submissions,
  onUpdateProfile,
  onOpenSubmitModal,
  onSelectSubmission,
  onOpenAuthModal,
  onSignOut,
  onBrowseDatasets
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Edit form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [collegeRollNo, setCollegeRollNo] = useState('');
  const [department, setDepartment] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [bio, setBio] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [preferredTools, setPreferredTools] = useState<string[]>([]);
  const [avatarColor, setAvatarColor] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  // If not logged in, prompt sign in / register
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mx-auto shadow-xl">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white">Participant Profile &amp; Submission History</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Sign in or register your student account to manage your engineering day submissions, track real-time judges' ratings, and showcase your profile.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenAuthModal}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 active:scale-95 transition-all cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>Sign In or Register Account</span>
          </button>
        </div>
      </div>
    );
  }

  // Filter submissions by this user
  const userSubmissions = submissions.filter(s => {
    if (s.userId && s.userId === user.id) return true;
    if (s.collegeRollNo && s.collegeRollNo.toUpperCase() === user.collegeRollNo.toUpperCase()) return true;
    if (s.studentName && s.studentName.toLowerCase().includes(user.name.toLowerCase())) return true;
    return false;
  });

  // Calculate engagement stats
  const totalSubmissions = userSubmissions.length;
  const bestRank = userSubmissions.length > 0 
    ? Math.min(...userSubmissions.map(s => s.rank || 999))
    : null;
  const avgScore = userSubmissions.length > 0
    ? (userSubmissions.reduce((acc, s) => acc + s.averageScore, 0) / userSubmissions.length).toFixed(1)
    : '-';
  
  // All special badges won by user
  const allBadges = Array.from(new Set(
    userSubmissions.flatMap(s => s.specialBadges || [])
  ));

  const startEditing = () => {
    setName(user.name);
    setEmail(user.email);
    setCollegeRollNo(user.collegeRollNo);
    setDepartment(user.department);
    setYearOfStudy(user.yearOfStudy);
    setBio(user.bio || '');
    setGithubUrl(user.githubUrl || '');
    setPortfolioUrl(user.portfolioUrl || '');
    setPreferredTools(user.preferredTools || []);
    setAvatarColor(user.avatarColor || AVATAR_COLORS[0]);
    setIsEditing(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...user,
      name: name.trim() || user.name,
      email: email.trim() || user.email,
      collegeRollNo: collegeRollNo.trim().toUpperCase() || user.collegeRollNo,
      department: department || user.department,
      yearOfStudy: yearOfStudy || user.yearOfStudy,
      bio: bio.trim(),
      githubUrl: githubUrl.trim() || undefined,
      portfolioUrl: portfolioUrl.trim() || undefined,
      preferredTools,
      avatarColor
    };

    onUpdateProfile(updated);
    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const toggleTool = (tool: string) => {
    if (preferredTools.includes(tool)) {
      setPreferredTools(preferredTools.filter(t => t !== tool));
    } else {
      setPreferredTools([...preferredTools, tool]);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Toast Alert */}
      {saveToast && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs flex items-center justify-between shadow-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">Profile information updated successfully!</span>
          </div>
          <button onClick={() => setSaveToast(false)} className="text-emerald-400 hover:text-emerald-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* USER PROFILE CARD */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 shadow-xl overflow-hidden">
        
        {/* Banner strip */}
        <div className="h-28 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 relative">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {!isEditing ? (
              <>
                <button
                  onClick={startEditing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-bold border border-slate-700 backdrop-blur-sm transition-all cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={onOpenAuthModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 backdrop-blur-sm transition-all cursor-pointer"
                >
                  <span>Switch Account</span>
                </button>
                <button
                  onClick={onSignOut}
                  className="p-1.5 rounded-xl bg-slate-900/80 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-700 backdrop-blur-sm transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : null}
          </div>
        </div>

        {/* Profile Content Body */}
        <div className="px-6 pb-6 pt-0 relative">
          
          {/* Avatar */}
          <div className="-mt-14 mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-tr ${user.avatarColor} border-4 border-slate-900 shadow-2xl flex items-center justify-center text-white text-2xl font-black shrink-0`}>
                {user.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white">{user.name}</h2>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                    {user.collegeRollNo}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {user.department} • <strong className="text-slate-300">{user.yearOfStudy}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenSubmitModal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 active:scale-95 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Visualization</span>
              </button>
            </div>
          </div>

          {/* EDIT FORM (Conditional) */}
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="mt-6 p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                  Edit Participant Profile
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">College Roll No</label>
                  <input
                    type="text"
                    required
                    value={collegeRollNo}
                    onChange={(e) => setCollegeRollNo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Department / Branch</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
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
                  <label className="text-xs font-bold text-slate-300">Year of Study</label>
                  <select
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="1st Year">1st Year (Freshman)</option>
                    <option value="2nd Year">2nd Year (Sophomore)</option>
                    <option value="3rd Year">3rd Year (Junior)</option>
                    <option value="4th Year">4th Year (Senior)</option>
                    <option value="M.Tech / PG">Postgraduate / M.Tech</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Bio &amp; Research Interests</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">GitHub Profile URL</label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Portfolio URL</label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Tools */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Preferred Visualization Tools</label>
                <div className="flex flex-wrap gap-1.5">
                  {['python', 'matplotlib', 'seaborn', 'plotly', 'powerbi', 'tableau', 'pandas'].map((t) => {
                    const sel = preferredTools.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => toggleTool(t)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                          sel
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {sel && <Check className="w-3 h-3" />}
                        <span>{t}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Avatar Color */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Avatar Theme</label>
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

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 active:scale-95 transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          ) : (
            /* VIEW MODE DETAILS */
            <div className="space-y-4">
              {user.bio && (
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  "{user.bio}"
                </p>
              )}

              {/* Metadata & Social Row */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-slate-300">{user.email}</span>
                </div>

                {user.githubUrl && (
                  <a
                    href={user.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {user.portfolioUrl && (
                  <a
                    href={user.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Portfolio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                <div className="flex items-center gap-1.5 text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Member since {user.joinedAt}</span>
                </div>
              </div>

              {/* Preferred visualization tools tags */}
              {user.preferredTools && user.preferredTools.length > 0 && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Stack:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {user.preferredTools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded bg-slate-950 text-indigo-300 border border-slate-800 font-mono text-[10px] uppercase font-bold"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* PARTICIPANT ENGAGEMENT STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Submissions
          </span>
          <div className="text-2xl font-black text-white font-mono">
            {totalSubmissions}
          </div>
          <span className="text-[10px] text-slate-500">Uploaded projects</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
            Best Live Rank
          </span>
          <div className="text-2xl font-black text-amber-300 font-mono flex items-center gap-1.5">
            {bestRank && bestRank < 999 ? (
              <>
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>#{bestRank}</span>
              </>
            ) : (
              <span className="text-slate-500 text-lg font-normal">Unranked</span>
            )}
          </div>
          <span className="text-[10px] text-slate-500">On live leaderboard</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
            Average Score
          </span>
          <div className="text-2xl font-black text-emerald-300 font-mono">
            {avgScore} {avgScore !== '-' && <span className="text-xs text-slate-500 font-normal">/ 100</span>}
          </div>
          <span className="text-[10px] text-slate-500">From panel evaluations</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">
            Honors Won
          </span>
          <div className="text-2xl font-black text-purple-300 font-mono flex items-center gap-1.5">
            <Award className="w-5 h-5 text-purple-400" />
            <span>{allBadges.length}</span>
          </div>
          <span className="text-[10px] text-slate-500">Category nominations</span>
        </div>

      </div>

      {/* MY SUBMISSION HISTORY SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              My Submissions History ({userSubmissions.length})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Review and inspect your submitted visualizations, ratings, and feedback from the judging panel.
            </p>
          </div>

          <button
            onClick={onOpenSubmitModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Add Submission</span>
          </button>
        </div>

        {userSubmissions.length === 0 ? (
          <div className="p-10 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
              <Code2 className="w-6 h-6" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h4 className="text-sm font-bold text-white">No submissions uploaded yet</h4>
              <p className="text-xs text-slate-400">
                You haven't submitted any visualization for Engineering Day yet! Choose one of the curated Kaggle datasets, create your charts using Python or modern BI tools, and submit before 03:30 PM.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={onBrowseDatasets}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Browse Datasets &amp; Code Starters
              </button>
              <button
                onClick={onOpenSubmitModal}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Open Submission Form
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {userSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all shadow-lg space-y-4"
              >
                {/* Submission Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {sub.datasetTitle}
                      </span>
                      {sub.rank && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1 font-mono">
                          <Trophy className="w-3 h-3" />
                          Rank #{sub.rank}
                        </span>
                      )}
                      <span className="text-[11px] text-slate-500">
                        Submitted: {sub.submittedAt}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white">{sub.title}</h4>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-black text-emerald-400 font-mono leading-none">
                        {sub.averageScore.toFixed(1)}
                      </div>
                      <span className="text-[10px] text-slate-400">/ 100 avg ({sub.scores.length} reviews)</span>
                    </div>

                    <button
                      onClick={() => onSelectSubmission(sub)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </div>
                </div>

                {/* Body: Preview + Details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div 
                    onClick={() => onSelectSubmission(sub)}
                    className="md:col-span-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/10] cursor-pointer group relative"
                  >
                    <img
                      src={sub.imageUrl}
                      alt={sub.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs font-bold text-white bg-indigo-600 px-3 py-1.5 rounded-lg shadow">
                        Click to Zoom
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-8 space-y-3">
                    {/* Insights discovered */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Submitted Insights:
                      </span>
                      {sub.keyInsights.slice(0, 2).map((insight, idx) => (
                        <div key={idx} className="text-xs text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80 leading-snug">
                          {insight}
                        </div>
                      ))}
                    </div>

                    {/* Files & Links */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {sub.externalLink && (
                        <a
                          href={sub.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold hover:bg-indigo-600 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Live Dashboard</span>
                        </a>
                      )}

                      {sub.dashboardFileName && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono">
                          <FileCode className="w-3 h-3 text-purple-400" />
                          <span>{sub.dashboardFileName}</span>
                        </span>
                      )}

                      {sub.pythonLibraries?.map((lib) => (
                        <span key={lib} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] uppercase">
                          {lib}
                        </span>
                      ))}

                      {sub.specialBadges?.map((b) => (
                        <span key={b} className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          {b}
                        </span>
                      ))}
                    </div>

                    {/* Latest Judge Feedback */}
                    {sub.scores.length > 0 && sub.scores[0]?.comments && (
                      <div className="text-xs text-slate-300 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 flex items-start gap-2">
                        <span className="font-bold text-amber-400 shrink-0">Panel Feedback:</span>
                        <span className="italic">"{sub.scores[0].comments}" — {sub.scores[0].judgeName}</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
