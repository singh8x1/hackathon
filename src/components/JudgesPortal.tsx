import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  BarChart3, 
  CheckCircle2, 
  User, 
  Sparkles, 
  MessageSquare, 
  ChevronRight, 
  Star, 
  Code2, 
  ExternalLink,
  Info,
  Layers,
  FileCode,
  Sliders,
  Check
} from 'lucide-react';
import { Submission, JudgeScore } from '../types';

interface JudgesPortalProps {
  submissions: Submission[];
  selectedSubmissionId?: string;
  onScoreSubmitted: (submissionId: string, score: JudgeScore) => void;
  onInspectSubmission: (sub: Submission) => void;
}

interface JudgeProfile {
  id: string;
  name: string;
  role: string;
}

const PANEL_JUDGES: JudgeProfile[] = [
  { id: 'j-01', name: 'Dr. Vikram Malhotra', role: 'Head of Dept (Computer Engineering)' },
  { id: 'j-02', name: 'Dr. Anita Joshi', role: 'Associate Professor & Data Science Chair' },
  { id: 'j-03', name: 'Tanvi Shah', role: 'Lead BI Architect @ CloudScale Solutions' },
  { id: 'j-custom', name: 'Prof. Guest Judge', role: 'Engineering Day Evaluation Panelist' }
];

export const JudgesPortal: React.FC<JudgesPortalProps> = ({
  submissions,
  selectedSubmissionId,
  onScoreSubmitted,
  onInspectSubmission
}) => {
  const [activeSubmissionId, setActiveSubmissionId] = useState<string>(
    selectedSubmissionId || (submissions[0]?.id ?? '')
  );

  // Active Judge
  const [activeJudge, setActiveJudge] = useState<JudgeProfile>(PANEL_JUDGES[0]);

  // Rubric Sliders (0 - 25 each, totaling 100)
  const [insightScore, setInsightScore] = useState<number>(23);
  const [visualDesignScore, setVisualDesignScore] = useState<number>(24);
  const [technicalScore, setTechnicalScore] = useState<number>(23);
  const [storytellingScore, setStorytellingScore] = useState<number>(22);
  
  // Feedback and awards
  const [comments, setComments] = useState<string>('');
  const [selectedAwards, setSelectedAwards] = useState<string[]>([]);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Sync if prop changed
  useEffect(() => {
    if (selectedSubmissionId) {
      setActiveSubmissionId(selectedSubmissionId);
    }
  }, [selectedSubmissionId]);

  const currentSubmission = submissions.find(s => s.id === activeSubmissionId) || submissions[0];

  // Pre-load existing judge score if this judge has already reviewed
  useEffect(() => {
    if (!currentSubmission) return;
    const existing = currentSubmission.scores.find(s => s.judgeId === activeJudge.id);
    if (existing) {
      setInsightScore(existing.insightScore);
      setVisualDesignScore(existing.visualDesignScore);
      setTechnicalScore(existing.technicalScore);
      setStorytellingScore(existing.storytellingScore);
      setComments(existing.comments);
      setSelectedAwards(existing.specialAwards || []);
    } else {
      // Default recommended balanced values
      setInsightScore(22);
      setVisualDesignScore(23);
      setTechnicalScore(22);
      setStorytellingScore(22);
      setComments('');
      setSelectedAwards([]);
    }
  }, [currentSubmission?.id, activeJudge.id]);

  const totalScore = insightScore + visualDesignScore + technicalScore + storytellingScore;

  const toggleAward = (award: string) => {
    if (selectedAwards.includes(award)) {
      setSelectedAwards(selectedAwards.filter(a => a !== award));
    } else {
      setSelectedAwards([...selectedAwards, award]);
    }
  };

  // AI Assist / Auto-Evaluate helper to suggest constructive feedback
  const handleAIAssistFeedback = () => {
    if (!currentSubmission) return;
    let suggestedNote = `Solid exploratory work on "${currentSubmission.datasetTitle}". `;
    if (currentSubmission.track === 'python') {
      suggestedNote += `The use of ${(currentSubmission.pythonLibraries || ['Python libraries']).join(', ')} effectively translates the key findings. `;
    } else {
      suggestedNote += `The ${currentSubmission.interactiveTool || 'BI'} dashboard layout maintains strong visual clarity. `;
    }
    suggestedNote += `Key insight on "${currentSubmission.keyInsights[0]?.slice(0, 70)}..." delivers valuable engineering domain takeaways.`;
    setComments(suggestedNote);
    
    // Suggest balanced high-merit scores
    setInsightScore(23);
    setVisualDesignScore(24);
    setTechnicalScore(23);
    setStorytellingScore(23);
  };

  const handleSubmitScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSubmission) return;

    const newScore: JudgeScore = {
      judgeId: activeJudge.id,
      judgeName: activeJudge.name,
      judgeRole: activeJudge.role,
      insightScore,
      visualDesignScore,
      technicalScore,
      storytellingScore,
      totalScore,
      comments: comments.trim() || 'Thorough evaluation completed. High quality data visualization.',
      specialAwards: selectedAwards,
      ratedAt: 'Just now'
    };

    onScoreSubmitted(currentSubmission.id, newScore);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    setSuccessToast(`Score for "${currentSubmission.title}" submitted successfully! Leaderboard updated in real-time.`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const availableAwardBadges = [
    'Best Python Code',
    'Top Insight Award',
    'Seaborn Statistical Excellence',
    'Plotly Interactive Genius',
    'Power BI Masterpiece',
    'Tableau Storyteller',
    'Best Matplotlib Art'
  ];

  return (
    <div className="space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            Faculty &amp; Industry Review Chamber
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Judges Scoring &amp; Rating Portal
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Evaluate engineering day submissions across 4 standardized rubric categories (25 pts each, 100 max). Ratings immediately influence the live leaderboard.
          </p>
        </div>

        {/* Judge Profile Selector */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <User className="w-4 h-4 text-indigo-400 ml-2" />
          <span className="text-xs text-slate-400 font-semibold">Active Judge:</span>
          <select
            value={activeJudge.id}
            onChange={(e) => {
              const j = PANEL_JUDGES.find(pj => pj.id === e.target.value) || PANEL_JUDGES[0];
              setActiveJudge(j);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-950 text-white text-xs font-bold border border-slate-800 focus:outline-none cursor-pointer"
          >
            {PANEL_JUDGES.map((j) => (
              <option key={j.id} value={j.id}>
                {j.name} ({j.role.split(' ')[0]})
              </option>
            ))}
          </select>
        </div>
      </div>

      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs flex items-center justify-between animate-fade-in shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">{successToast}</span>
          </div>
          <button 
            onClick={() => setSuccessToast(null)} 
            className="text-emerald-400 hover:text-emerald-200 text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Judging Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Submissions Queue Strip (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-bold uppercase tracking-wider">Submissions Queue ({submissions.length})</span>
            <span>Select to score</span>
          </div>

          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {submissions.map((sub) => {
              const isSelected = sub.id === activeSubmissionId;
              const hasJudged = sub.scores.some(s => s.judgeId === activeJudge.id);
              return (
                <div
                  key={sub.id}
                  onClick={() => setActiveSubmissionId(sub.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500 shadow-md ring-1 ring-indigo-500/40'
                      : 'bg-slate-900/80 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                        {sub.track === 'python' ? 'Python' : 'Interactive'}
                      </span>
                      {hasJudged && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-0.5">
                          <Check className="w-2.5 h-2.5" /> Reviewed
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {sub.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {sub.studentName} • {sub.department}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-white font-mono">
                      {sub.averageScore > 0 ? sub.averageScore.toFixed(1) : '-'}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {sub.scores.length} reviews
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Submission Review & Scoring Sliders (8 cols) */}
        {currentSubmission && (
          <div className="lg:col-span-8 space-y-6">
            
            {/* Project Summary Banner */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs text-indigo-400 font-semibold">{currentSubmission.datasetTitle}</span>
                  <h3 className="text-lg font-black text-white">{currentSubmission.title}</h3>
                  <p className="text-xs text-slate-400">
                    Lead: <strong className="text-slate-200">{currentSubmission.studentName}</strong> ({currentSubmission.collegeRollNo}) • {currentSubmission.department}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onInspectSubmission(currentSubmission)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                  >
                    <span>Full Screen Preview</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Visualization Thumbnail + Top Insights Teaser */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-5 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/10]">
                  <img
                    src={currentSubmission.imageUrl}
                    alt={currentSubmission.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="sm:col-span-7 space-y-2">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Key Student Insights:
                  </div>
                  <div className="space-y-1.5">
                    {currentSubmission.keyInsights.slice(0, 2).map((ins, iIdx) => (
                      <div key={iIdx} className="text-xs text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80 leading-snug">
                        {ins}
                      </div>
                    ))}
                  </div>
                  {currentSubmission.pythonLibraries && (
                    <div className="pt-1 flex items-center gap-1 text-[11px] text-slate-400">
                      <span>Libraries:</span>
                      {currentSubmission.pythonLibraries.map(l => (
                        <span key={l} className="px-1.5 py-0.2 rounded bg-slate-800 text-indigo-300 font-mono text-[10px]">
                          {l}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SCORING FORM */}
            <form onSubmit={handleSubmitScore} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
              
              {/* Form Title & Total Score Gauge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-indigo-400" />
                    Engineering Day Evaluation Rubric
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Move sliders to allocate points across the 4 judging dimensions.
                  </p>
                </div>

                {/* Score Total Badge */}
                <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Total Score</div>
                    <div className="text-2xl font-black text-emerald-400 font-mono leading-none">
                      {totalScore}
                      <span className="text-xs text-slate-500 font-normal"> / 100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Rubric Sliders */}
              <div className="space-y-5">
                
                {/* 1. Insight Depth */}
                <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white">
                        1. Insight Depth &amp; Analytical Rigor
                      </span>
                      <p className="text-[11px] text-slate-400">
                        Statistical depth, novelty of engineering insights, answering dataset core challenges.
                      </p>
                    </div>
                    <span className="text-sm font-black text-indigo-400 font-mono px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-500/30">
                      {insightScore} / 25
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={25}
                    value={insightScore}
                    onChange={(e) => setInsightScore(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0 (Shallow)</span>
                    <span>12 (Average)</span>
                    <span>18 (Proficient)</span>
                    <span>25 (Publication Quality)</span>
                  </div>
                </div>

                {/* 2. Visual Design & Creative Aesthetics */}
                <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white">
                        2. Visual Design &amp; Creative Aesthetics
                      </span>
                      <p className="text-[11px] text-slate-400">
                        Color harmony, typography, whitespace, aspect ratio, clean legends, zero clutter.
                      </p>
                    </div>
                    <span className="text-sm font-black text-purple-400 font-mono px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30">
                      {visualDesignScore} / 25
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={25}
                    value={visualDesignScore}
                    onChange={(e) => setVisualDesignScore(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0 (Unstyled)</span>
                    <span>12 (Basic Plot)</span>
                    <span>18 (Polished)</span>
                    <span>25 (Masterpiece)</span>
                  </div>
                </div>

                {/* 3. Technical Execution & Python Mastery */}
                <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white">
                        3. Technical Execution &amp; Tool Mastery
                      </span>
                      <p className="text-[11px] text-slate-400">
                        Effective use of Matplotlib / Seaborn / Plotly code, or Power BI / Tableau DAX modeling.
                      </p>
                    </div>
                    <span className="text-sm font-black text-sky-400 font-mono px-2 py-0.5 rounded bg-sky-950/60 border border-sky-500/30">
                      {technicalScore} / 25
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={25}
                    value={technicalScore}
                    onChange={(e) => setTechnicalScore(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0 (Broken)</span>
                    <span>12 (Template Copy)</span>
                    <span>18 (Solid Code)</span>
                    <span>25 (Advanced Custom)</span>
                  </div>
                </div>

                {/* 4. Storytelling & Clarity */}
                <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white">
                        4. Storytelling, Clarity &amp; Impact
                      </span>
                      <p className="text-[11px] text-slate-400">
                        Explaining takeaways clearly, insightful annotations, actionable engineering relevance.
                      </p>
                    </div>
                    <span className="text-sm font-black text-emerald-400 font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                      {storytellingScore} / 25
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={25}
                    value={storytellingScore}
                    onChange={(e) => setStorytellingScore(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0 (Unclear)</span>
                    <span>12 (Understood)</span>
                    <span>18 (Compelling)</span>
                    <span>25 (Executive Story)</span>
                  </div>
                </div>

              </div>

              {/* Special Award Nomination Checkboxes */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Nominate for Category Badge / Special Award:
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableAwardBadges.map((award) => {
                    const isNominated = selectedAwards.includes(award);
                    return (
                      <button
                        key={award}
                        type="button"
                        onClick={() => toggleAward(award)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isNominated
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        <Award className="w-3 h-3" />
                        <span>{award}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Written Judge Comments & AI Feedback Suggestion */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                    Panel Qualitative Critique &amp; Commendation
                  </label>
                  <button
                    type="button"
                    onClick={handleAIAssistFeedback}
                    className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Auto-Draft Review Critique</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Leave constructive feedback for the student team (e.g., strong statistical dispersion, recommend annotating outlier points)..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 leading-relaxed placeholder:text-slate-600"
                />
              </div>

              {/* Submit Review Action */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  Reviewing as: <strong className="text-white">{activeJudge.name}</strong>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 active:scale-95 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Score &amp; Update Leaderboard</span>
                </button>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
};
