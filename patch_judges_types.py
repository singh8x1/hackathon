import re

# 1. Update types.ts
with open("src/types.ts", "r") as f:
    types_content = f.read()

types_content = re.sub(
    r'  insightScore: number; // max 25\s+visualDesignScore: number; // max 25\s+technicalScore: number; // max 25\s+storytellingScore: number; // max 25',
    r'''  question1Score: number; // max 33
  question2Score: number; // max 33
  question3Score: number; // max 34''',
    types_content
)

with open("src/types.ts", "w") as f:
    f.write(types_content)

# 2. Update SubmissionDetailModal.tsx
with open("src/components/SubmissionDetailModal.tsx", "r") as f:
    sdm_content = f.read()

# Replace "Judges Scores (X)" with "Admin Evaluation" if we want, but "Admin Evaluation" is good.
sdm_content = sdm_content.replace('<span>Judges Scores ({submission.scores.length})</span>', '<span>Admin Evaluation ({submission.scores.length})</span>')
sdm_content = sdm_content.replace('Evaluated by {submission.scores.length} judging panel members', 'Evaluated by Admin')

sdm_content = re.sub(
    r'<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">.*?<span className="font-bold text-white font-mono">\{score\.storytellingScore\} / 25</span>\s*</div>\s*</div>',
    r'''<div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
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
                      </div>''',
    sdm_content,
    flags=re.DOTALL
)

with open("src/components/SubmissionDetailModal.tsx", "w") as f:
    f.write(sdm_content)

