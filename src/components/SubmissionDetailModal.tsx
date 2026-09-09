import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Code2, 
  Trophy, 
  Award, 
  Copy, 
  Check, 
  Download, 
  Maximize2, 
  BarChart3, 
  User, 
  Calendar, 
  FileCode, 
  Sparkles,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { Submission } from '../types';

interface SubmissionDetailModalProps {
  submission: Submission | null;
  onClose: () => void;
  onJudgeThisSubmission: (submissionId: string) => void;
}

export const SubmissionDetailModal: React.FC<SubmissionDetailModalProps> = ({
  submission,
  onClose,
  onJudgeThisSubmission
}) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'code' | 'scores'>('visual');
  const [copiedCode, setCopiedCode] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!submission) return null;

  const handleCopyCode = () => {
    if (!submission.pythonCode) return;
    navigator.clipboard.writeText(submission.pythonCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                {submission.datasetTitle}
              </span>
              {submission.rank && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  Rank #{submission.rank}
                </span>
              )}
              <span className="text-xs text-slate-400">
                Submitted: {submission.submittedAt}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              {submission.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Sub-Tabs */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'visual'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Visualization &amp; Insights
            </button>
            {submission.pythonCode && (
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'code'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Python Script</span>
              </button>
            )}
            <button
              onClick={() => setActiveTab('scores')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'scores'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Admin Evaluation ({submission.scores.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onJudgeThisSubmission(submission.id);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Score in Admin Portal</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* TAB 1: VISUALIZATION & INSIGHTS */}
          {activeTab === 'visual' && (
            <div className="space-y-6">
              
              {/* Visualization Stage */}
              <div className="relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden group">
                <img
                  src={submission.imageUrl}
                  alt={submission.title}
                  className={`w-full transition-all duration-300 ${
                    isZoomed ? 'max-h-none object-contain' : 'max-h-[460px] object-contain mx-auto'
                  }`}
                />
                
                {/* Overlay actions */}
                <div className="absolute top-3 right-3 flex items-center gap-2 bg-slate-950/80 backdrop-blur-sm p-1.5 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="p-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title={isZoomed ? 'Fit to frame' : 'Enlarge view'}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <a
                    href={submission.imageUrl}
                    download={submission.imageFileName || 'visualization.png'}
                    className="p-1.5 text-slate-300 hover:text-white transition-colors"
                    title="Download high-res image"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>

                <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between">
                  <span>File: {submission.imageFileName}</span>
                  <div className="flex items-center gap-2">
                    {submission.pythonLibraries?.map((lib) => (
                      <span key={lib} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono uppercase text-[10px]">
                        {lib}
                      </span>
                    ))}
                    {submission.interactiveTool && (
                      <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono uppercase text-[10px]">
                        {submission.interactiveTool}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Interactive Links & File Attachments */}
              {(submission.externalLink || submission.dashboardFileName) && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <ExternalLink className="w-4 h-4 text-indigo-400" />
                      Interactive Review Access
                    </h4>
                    <p className="text-xs text-slate-400">
                      Judges can explore interactive dashboard capabilities or source pipelines.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {submission.externalLink && (
                      <a
                        href={submission.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                      >
                        <span>Open Live Visualization</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {submission.dashboardFileName && (
                      <a
                        href={submission.dashboardFileUrl || '#'}
                        download={submission.dashboardFileName}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
                      >
                        <FileCode className="w-3.5 h-3.5 text-purple-400" />
                        <span>Download {submission.dashboardFileName}</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Key Insights Discovered */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Key Insights Discovered by Student
                </h4>
                <div className="space-y-2">
                  {submission.keyInsights.map((insight, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">
                        {insight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Methodology & Student Attribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Design &amp; Analytical Methodology
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {submission.methodology}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Participant Credentials
                  </h4>
                  <div className="space-y-1 text-xs text-slate-300">
                    {submission.teamName ? (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Team Name:</span>
                        <span className="font-bold text-white bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded">{submission.teamName}</span>
                      </div>
                    ) : null}
                    <div className="flex justify-between">
                      <span className="text-slate-500">Lead Author:</span>
                      <span className="font-bold text-white">{submission.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Department:</span>
                      <span>{submission.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Year / Roll No:</span>
                      <span className="font-mono">{submission.yearOfStudy} • {submission.collegeRollNo}</span>
                    </div>
                    {submission.teamMembers && submission.teamMembers.length > 1 && (
                      <div className="pt-2 mt-1 border-t border-slate-800/60 flex justify-between">
                        <span className="text-slate-500">Team Members:</span>
                        <span className="text-right">{submission.teamMembers.join(' & ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PYTHON CODE */}
          {activeTab === 'code' && submission.pythonCode && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    Python Visualization Code Script
                  </h4>
                  <p className="text-xs text-slate-400">
                    Review the code used by the student to generate this visualization.
                  </p>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#090d16] p-4 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed">
                <pre>
                  <code>{submission.pythonCode}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: JUDGES SCORES */}
          {activeTab === 'scores' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Overall Standings</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-black text-white font-mono">{submission.averageScore.toFixed(1)}</span>
                    <span className="text-xs text-slate-400">/ 100 average</span>
                  </div>
                  <p className="text-xs text-slate-400">Evaluated by Admin</p>
                </div>

                {submission.specialBadges && submission.specialBadges.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {submission.specialBadges.map((badge, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Individual Judge Reviews */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Individual Panel Reviews &amp; Rubric Scoring
                </h4>

                {submission.scores.length === 0 ? (
                  <div className="p-8 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                    <BarChart3 className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-xs font-bold text-slate-300">No panel reviews yet</p>
                    <p className="text-xs text-slate-500">
                      Be the first judge to evaluate this student's visualization!
                    </p>
                  </div>
                ) : (
                  submission.scores.map((score, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                        <div>
                          <h5 className="text-xs font-bold text-white">{score.judgeName}</h5>
                          <span className="text-[11px] text-slate-400">{score.judgeRole}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">{score.ratedAt}</span>
                          <span className="text-sm font-black text-emerald-400 font-mono bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                            {score.totalScore} / 100
                          </span>
                        </div>
                      </div>

                      {/* Rubric Breakdown Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                          <span className="text-[10px] text-slate-400 block">Q1 Score</span>
                          <span className="font-bold text-white font-mono">{score.question1Score} / 33</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                          <span className="text-[10px] text-slate-400 block">Q2 Score</span>
                          <span className="font-bold text-white font-mono">{score.question2Score} / 33</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                          <span className="text-[10px] text-slate-400 block">Q3 Score</span>
                          <span className="font-bold text-white font-mono">{score.question3Score} / 34</span>
                        </div>
                      </div>

                      {score.comments && (
                        <p className="text-xs text-slate-300 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                          "{score.comments}"
                        </p>
                      )}

                      {score.specialAwards && score.specialAwards.length > 0 && (
                        <div className="flex items-center gap-2 pt-1 text-[11px] text-amber-300">
                          <span>Awarded:</span>
                          {score.specialAwards.map((a, aIdx) => (
                            <span key={aIdx} className="font-bold underline">{a}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
