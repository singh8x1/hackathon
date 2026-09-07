import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  FileCode, 
  Code2, 
  BarChart, 
  Sparkles, 
  Link as LinkIcon, 
  Plus, 
  Trash2, 
  Check, 
  AlertCircle,
  FileCheck,
  Zap,
  Info
} from 'lucide-react';
import { Submission, TrackType, PythonLibrary, InteractiveTool, UserProfile } from '../types';
import { KAGGLE_DATASETS } from '../data/datasets';

interface SubmissionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (newSubmission: Submission) => void;
  preSelectedDatasetId?: string;
  currentUser?: UserProfile | null;
}

export const SubmissionFormModal: React.FC<SubmissionFormModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  preSelectedDatasetId,
  currentUser
}) => {
  // Form state
  const [title, setTitle] = useState('');
  const [studentName, setStudentName] = useState(currentUser?.name || '');
  const [teamMembersInput, setTeamMembersInput] = useState('');
  const [collegeRollNo, setCollegeRollNo] = useState(currentUser?.collegeRollNo || '');
  const [department, setDepartment] = useState(currentUser?.department || 'Computer Science & AI');
  const [yearOfStudy, setYearOfStudy] = useState(currentUser?.yearOfStudy || '3rd Year');
  const [datasetId, setDatasetId] = useState(preSelectedDatasetId || KAGGLE_DATASETS[0].id);

  // Sync with currentUser when modal opens or user switches
  React.useEffect(() => {
    if (currentUser) {
      setStudentName(currentUser.name);
      setCollegeRollNo(currentUser.collegeRollNo);
      setDepartment(currentUser.department);
      setYearOfStudy(currentUser.yearOfStudy);
    }
  }, [currentUser, isOpen]);
  const [track, setTrack] = useState<TrackType>('python');
  
  // Python libraries
  const [pythonLibraries, setPythonLibraries] = useState<PythonLibrary[]>(['matplotlib', 'seaborn']);
  // Interactive tool
  const [interactiveTool, setInteractiveTool] = useState<InteractiveTool>('powerbi');
  
  // Image file upload
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageFileName, setImageFileName] = useState<string>('');
  const [imageSize, setImageSize] = useState<string>('');
  const [isImageDragging, setIsImageDragging] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Dashboard file upload & external link
  const [dashboardFileName, setDashboardFileName] = useState<string>('');
  const [dashboardFileType, setDashboardFileType] = useState<string>('');
  const [dashboardFileUrl, setDashboardFileUrl] = useState<string>('');
  const [externalLink, setExternalLink] = useState<string>('');
  const [isDashboardDragging, setIsDashboardDragging] = useState(false);
  const dashboardInputRef = useRef<HTMLInputElement>(null);

  // Insights & Code
  const [keyInsights, setKeyInsights] = useState<string[]>([
    'Peak performance metric exhibited an exponential transition past threshold value.',
    'Clear variance discovered across engineering cohorts that challenges traditional assumptions.'
  ]);
  const [pythonCode, setPythonCode] = useState<string>(`import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Engineering Day Visualization Script
df = pd.read_csv("dataset.csv")

plt.figure(figsize=(10, 6), dpi=200)
sns.set_theme(style="whitegrid")

# Plot custom analysis
sns.scatterplot(data=df, x="Feature_A", y="Feature_B", hue="Category", palette="viridis", s=60)
plt.title("Engineering Day 2026: Discovered Insights", fontsize=14, fontweight="bold")
plt.xlabel("Primary Engineering Dimension")
plt.ylabel("Output Response Metric")
plt.tight_layout()
plt.savefig("submission.png", dpi=300)
plt.show()`);
  const [methodology, setMethodology] = useState('');

  // Validation errors
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Drag & drop handlers for visual image
  const handleImageFile = (file: File) => {
    if (!file.type.includes('image/png') && !file.type.includes('image/jpeg') && !file.name.endsWith('.png') && !file.name.endsWith('.jpg') && !file.name.endsWith('.jpeg')) {
      setErrorMsg('Please upload visualization image in PNG or JPG format.');
      return;
    }
    if (file.size > 800 * 1024) {
      setErrorMsg('File is too large! Please keep the image under 800KB for the cloud database.');
      return;
    }
    setErrorMsg(null);
    setImageFileName(file.name);
    setImageSize(`${(file.size / 1024).toFixed(1)} KB`);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDashboardFile = (file: File) => {
    setErrorMsg(null);
    setDashboardFileName(file.name);
    const ext = '.' + file.name.split('.').pop();
    setDashboardFileType(ext);
    setDashboardFileUrl(URL.createObjectURL(file));
  };

  // Preset demo chart generation if user wants quick sample
  const handleUsePresetDemoImage = (theme: 'matplotlib' | 'seaborn' | 'plotly') => {
    const selectedDs = KAGGLE_DATASETS.find(d => d.id === datasetId) || KAGGLE_DATASETS[0];
    const color = theme === 'matplotlib' ? '#3b82f6' : theme === 'seaborn' ? '#10b981' : '#8b5cf6';
    
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#090d16" />
          <stop offset="100%" stop-color="#020617" />
        </linearGradient>
        <linearGradient id="curve" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.8" />
          <stop offset="100%" stop-color="${color}" stop-opacity="0.05" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#bg)" />
      <line x1="60" y1="80" x2="740" y2="80" stroke="#1e293b" stroke-dasharray="4" stroke-width="1" />
      <line x1="60" y1="180" x2="740" y2="180" stroke="#1e293b" stroke-dasharray="4" stroke-width="1" />
      <line x1="60" y1="280" x2="740" y2="280" stroke="#1e293b" stroke-dasharray="4" stroke-width="1" />
      <line x1="60" y1="380" x2="740" y2="380" stroke="#475569" stroke-width="2" />
      <line x1="60" y1="60" x2="60" y2="380" stroke="#475569" stroke-width="2" />
      <text x="60" y="45" fill="#f8fafc" font-size="16" font-weight="bold" font-family="sans-serif">${selectedDs.title}</text>
      <rect x="640" y="28" width="100" height="24" rx="12" fill="${color}" fill-opacity="0.2" />
      <text x="690" y="44" fill="${color}" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">${theme.toUpperCase()}</text>
      <path d="M 70 340 Q 180 220 280 260 T 480 160 T 680 90 L 720 110 L 720 380 L 70 380 Z" fill="url(#curve)" />
      <path d="M 70 340 Q 180 220 280 260 T 480 160 T 680 90 L 720 110" fill="none" stroke="${color}" stroke-width="3" />
      <circle cx="280" cy="260" r="6" fill="#fff" stroke="${color}" stroke-width="3" />
      <circle cx="480" cy="160" r="6" fill="#fff" stroke="${color}" stroke-width="3" />
      <circle cx="680" cy="90" r="6" fill="#fff" stroke="${color}" stroke-width="3" />
      <rect x="520" y="60" width="180" height="45" rx="6" fill="#1e293b" stroke="#334155" />
      <text x="535" y="78" fill="#94a3b8" font-size="9" font-family="sans-serif">BENCHMARK IMPACT</text>
      <text x="535" y="96" fill="${color}" font-size="14" font-weight="bold" font-family="sans-serif">+91.4% Correlation</text>
    </svg>`;
    const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    setImageUrl(dataUri);
    setImageFileName(`${theme}_${selectedDs.id}_export.png`);
    setImageSize('1.2 MB (Rendered)');
  };

  const handleInsightChange = (index: number, val: string) => {
    const updated = [...keyInsights];
    updated[index] = val;
    setKeyInsights(updated);
  };

  const handleAddInsight = () => {
    setKeyInsights([...keyInsights, '']);
  };

  const handleRemoveInsight = (index: number) => {
    if (keyInsights.length <= 1) return;
    setKeyInsights(keyInsights.filter((_, i) => i !== index));
  };

  const togglePythonLib = (lib: PythonLibrary) => {
    if (pythonLibraries.includes(lib)) {
      if (pythonLibraries.length > 1) {
        setPythonLibraries(pythonLibraries.filter(l => l !== lib));
      }
    } else {
      setPythonLibraries([...pythonLibraries, lib]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter a project title.');
      return;
    }
    if (!studentName.trim()) {
      setErrorMsg('Please enter your student name.');
      return;
    }
    if (!collegeRollNo.trim()) {
      setErrorMsg('Please enter your college roll number or student ID.');
      return;
    }
    if (!imageUrl) {
      setErrorMsg('Please upload your visualization chart in PNG or JPG format (or use the sample generator).');
      return;
    }

    const filteredInsights = keyInsights.filter(i => i.trim().length > 0);
    if (filteredInsights.length === 0) {
      setErrorMsg('Please enter at least one key insight discovered in your data.');
      return;
    }

    const selectedDs = KAGGLE_DATASETS.find(d => d.id === datasetId) || KAGGLE_DATASETS[0];

    // Build submission object
    const newSubmission: Submission = {
      id: `sub-${Date.now()}`,
      userId: currentUser?.id,
      title: title.trim(),
      studentName: studentName.trim(),
      teamMembers: teamMembersInput.trim() 
        ? teamMembersInput.split(',').map(m => m.trim()).filter(Boolean)
        : [studentName.trim()],
      collegeRollNo: collegeRollNo.trim(),
      department,
      yearOfStudy,
      datasetId: selectedDs.id,
      datasetTitle: selectedDs.title,
      track,
      pythonLibraries: track === 'python' ? pythonLibraries : undefined,
      interactiveTool: track === 'interactive' ? interactiveTool : undefined,
      imageUrl,
      imageFileName: imageFileName || 'visualization.png',
      dashboardFileUrl: dashboardFileUrl || undefined,
      dashboardFileName: dashboardFileName || undefined,
      dashboardFileType: dashboardFileType || undefined,
      externalLink: externalLink.trim() || undefined,
      keyInsights: filteredInsights,
      pythonCode: pythonCode.trim() || undefined,
      methodology: methodology.trim() || 'Executed data cleansing, feature transformation, and exploratory visualizations using standard engineering analytics methods.',
      submittedAt: 'Just now',
      status: 'pending_review',
      scores: [],
      averageScore: 0,
      specialBadges: []
    };

    // Confetti celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    onSubmitSuccess(newSubmission);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Submit Your Data Visualization
              </h3>
              <p className="text-xs text-slate-400">
                Engineering Day 2026 Championship Entry Portal
              </p>
            </div>
          </div>

          <button
            id="close-submission-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Project & Student Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <FileCheck className="w-4 h-4 text-indigo-400" />
              1. Participant &amp; Project Info
            </h4>

            {currentUser && (
              <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Submitting as verified participant: <strong>{currentUser.name}</strong> ({currentUser.collegeRollNo})</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Linked to Profile</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project / Visualization Title *
                </label>
                <input
                  id="project-title-input"
                  type="text"
                  required
                  placeholder="e.g., Battery Life Degradation under Extreme Fast Charging"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Lead Student Name *
                </label>
                <input
                  id="student-name-input"
                  type="text"
                  required
                  placeholder="e.g., Priya Sharma"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  College Roll No. / Student ID *
                </label>
                <input
                  id="student-roll-input"
                  type="text"
                  required
                  placeholder="e.g., ENG-2023-CS088"
                  value={collegeRollNo}
                  onChange={(e) => setCollegeRollNo(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Department / Branch
                </label>
                <select
                  id="student-dept-select"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="Computer Science & Engineering">Computer Science &amp; Engineering</option>
                  <option value="Artificial Intelligence & Data Science">AI &amp; Data Science</option>
                  <option value="Electronics & Communication">Electronics &amp; Communication (ECE)</option>
                  <option value="Electrical Engineering">Electrical Engineering (EEE)</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil & Environmental Engineering">Civil &amp; Environmental</option>
                  <option value="Information Technology">Information Technology</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Year of Study
                </label>
                <select
                  id="student-year-select"
                  value={yearOfStudy}
                  onChange={(e) => setYearOfStudy(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="1st Year">1st Year (Freshman)</option>
                  <option value="2nd Year">2nd Year (Sophomore)</option>
                  <option value="3rd Year">3rd Year (Junior)</option>
                  <option value="4th Year">4th Year (Senior / Final)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Team Members (Optional, comma-separated)
                </label>
                <input
                  id="team-members-input"
                  type="text"
                  placeholder="e.g., Rohan Gupta (CSE 3rd Yr), Sneha Roy (AI-DS 3rd Yr)"
                  value={teamMembersInput}
                  onChange={(e) => setTeamMembersInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Dataset & Track Selection */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              2. Dataset &amp; Methodology Track
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Chosen Kaggle Dataset *
                </label>
                <select
                  id="chosen-dataset-select"
                  value={datasetId}
                  onChange={(e) => setDatasetId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {KAGGLE_DATASETS.map((ds) => (
                    <option key={ds.id} value={ds.id}>
                      {ds.title} ({ds.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Submission Track *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTrack('python')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      track === 'python'
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <Code2 className="w-4 h-4" />
                    <span>Python Track</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTrack('interactive')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      track === 'interactive'
                        ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <BarChart className="w-4 h-4" />
                    <span>Interactive BI</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Track-specific sub-options */}
            {track === 'python' ? (
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <label className="block text-xs font-semibold text-indigo-300">
                  Python Visualization Libraries Used (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['matplotlib', 'seaborn', 'plotly'] as const).map((lib) => {
                    const isChecked = pythonLibraries.includes(lib);
                    return (
                      <button
                        key={lib}
                        type="button"
                        onClick={() => togglePythonLib(lib)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50'
                            : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-sm flex items-center justify-center border ${isChecked ? 'bg-indigo-500 border-indigo-400' : 'border-slate-600'}`}>
                          {isChecked && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span>{lib}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-slate-400">
                  Tip: Submissions combining Seaborn for statistical dispersion + Matplotlib for annotations qualify for the <strong className="text-emerald-400">Best Python Insight Award</strong>!
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <label className="block text-xs font-semibold text-purple-300">
                  Interactive Platform / Tool
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'powerbi', label: 'Microsoft Power BI (.pbix)' },
                    { id: 'tableau', label: 'Tableau Desktop / Public (.twbx)' },
                    { id: 'streamlit', label: 'Python Streamlit App' },
                    { id: 'other', label: 'Other Interactive Web Visual' }
                  ].map((tool) => (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => setInteractiveTool(tool.id as InteractiveTool)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        interactiveTool === tool.id
                          ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {tool.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Visualization Upload (PNG/JPG required, .pbix/.twbx optional, links) */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Upload className="w-4 h-4 text-sky-400" />
              3. Visual Snapshot &amp; Dashboard Files
            </h4>

            {/* Visual Image Upload (PNG / JPG) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-emerald-400" />
                  Primary Visualization Image (PNG or JPG) *
                </label>
                <span className="text-[11px] text-slate-400">Scored directly by judges panel</span>
              </div>

              {/* Drag & Drop Area */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsImageDragging(true); }}
                onDragLeave={() => setIsImageDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsImageDragging(false);
                  if (e.dataTransfer.files?.[0]) handleImageFile(e.dataTransfer.files[0]);
                }}
                onClick={() => imageInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-5 text-center transition-all cursor-pointer ${
                  isImageDragging
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : imageUrl
                    ? 'border-emerald-500/50 bg-slate-950/90'
                    : 'border-slate-700 hover:border-slate-600 bg-slate-950/60'
                }`}
              >
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleImageFile(e.target.files[0]);
                  }}
                />

                {imageUrl ? (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <img
                      src={imageUrl}
                      alt="Visual preview"
                      className="w-48 h-28 object-contain rounded-lg border border-slate-800 bg-slate-900"
                    />
                    <div className="text-left space-y-1">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white">{imageFileName}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">Size: {imageSize}</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageUrl('');
                          setImageFileName('');
                        }}
                        className="text-[11px] text-rose-400 hover:text-rose-300 font-semibold"
                      >
                        Remove &amp; re-upload
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-slate-300">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">
                        Drag &amp; drop your visualization PNG / JPG here, or <span className="text-indigo-400 underline">browse files</span>
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        High resolution recommended (1080p+, max 15MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Sample Generator Helper for convenient testing */}
              {!imageUrl && (
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-500 text-[11px]">Testing demo?</span>
                  <button
                    type="button"
                    onClick={() => handleUsePresetDemoImage('matplotlib')}
                    className="px-2 py-0.5 rounded bg-slate-800 text-blue-300 text-[11px] hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    + Matplotlib Snapshot
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUsePresetDemoImage('seaborn')}
                    className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300 text-[11px] hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    + Seaborn Snapshot
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUsePresetDemoImage('plotly')}
                    className="px-2 py-0.5 rounded bg-slate-800 text-purple-300 text-[11px] hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    + Plotly Snapshot
                  </button>
                </div>
              )}
            </div>

            {/* Interactive File & Public Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Upload Dashboard File (Optional: .pbix, .twbx, .html, .py, .ipynb)
                </label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDashboardDragging(true); }}
                  onDragLeave={() => setIsDashboardDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDashboardDragging(false);
                    if (e.dataTransfer.files?.[0]) handleDashboardFile(e.dataTransfer.files[0]);
                  }}
                  onClick={() => dashboardInputRef.current?.click()}
                  className="border border-slate-800 rounded-xl p-3 bg-slate-950/80 text-center cursor-pointer hover:border-slate-700 transition-colors"
                >
                  <input
                    ref={dashboardInputRef}
                    type="file"
                    accept=".pbix,.twbx,.html,.py,.ipynb,.zip"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleDashboardFile(e.target.files[0]);
                    }}
                  />
                  {dashboardFileName ? (
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-white font-medium truncate">
                        <FileCode className="w-4 h-4 text-purple-400 shrink-0" />
                        <span className="truncate">{dashboardFileName}</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                        {dashboardFileType}
                      </span>
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-slate-500" />
                      <span>Attach .pbix / .twbx / .ipynb</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tableau Public / Power BI / GitHub Live Link (Optional)
                </label>
                <div className="relative">
                  <LinkIcon className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    id="external-dashboard-link-input"
                    type="url"
                    placeholder="https://public.tableau.com/app/profile/..."
                    value={externalLink}
                    onChange={(e) => setExternalLink(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Key Insights & Python Code */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              4. Key Insights &amp; Python Code
            </h4>

            {/* Insights Bullet Points */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Key Data Insights Discovered * (What should the judges look for?)
                </label>
                <button
                  type="button"
                  onClick={handleAddInsight}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Bullet</span>
                </button>
              </div>

              <div className="space-y-2">
                {keyInsights.map((insight, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {idx + 1}.
                    </span>
                    <input
                      type="text"
                      placeholder="e.g., LFP battery chemistry exhibited 88% retention at 150k km vs 81% for NMC..."
                      value={insight}
                      onChange={(e) => handleInsightChange(idx, e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
                    />
                    {keyInsights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveInsight(idx)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Python Code Snippet */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  Python Visualization Script / Notebook Code (Optional but heavily rewarded)
                </label>
                <span className="text-[11px] text-slate-400">Matplotlib / Seaborn / Plotly</span>
              </div>
              <textarea
                id="python-code-textarea"
                rows={6}
                value={pythonCode}
                onChange={(e) => setPythonCode(e.target.value)}
                placeholder="# Paste your Python code here..."
                className="w-full p-3 rounded-xl bg-[#0a0f1d] border border-slate-800 text-slate-200 text-xs font-mono focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            {/* Methodology Statement */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Design &amp; Analytical Methodology (1-2 sentences)
              </label>
              <input
                type="text"
                value={methodology}
                onChange={(e) => setMethodology(e.target.value)}
                placeholder="e.g., Applied IQR outlier removal, log-transformed salary columns, and paired Seaborn kde with Matplotlib threshold annotations."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              id="confirm-submit-project-btn"
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 active:scale-95 transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Submit for Panel Review</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
