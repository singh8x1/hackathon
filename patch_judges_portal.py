import re

with open("src/components/JudgesPortal.tsx", "r") as f:
    content = f.read()

# Replace PANEL_JUDGES with ADMIN_JUDGE
content = re.sub(
    r"interface JudgeProfile \{[\s\S]*?const PANEL_JUDGES: JudgeProfile\[\] = \[[\s\S]*?\];",
    "const ADMIN_JUDGE = { id: 'admin', name: 'Administrator', role: 'Platform Admin' };",
    content
)

# Replace activeJudge state with just using ADMIN_JUDGE
content = re.sub(
    r"  // Active Judge\s*const \[activeJudge, setActiveJudge\] = useState<JudgeProfile>\(PANEL_JUDGES\[0\]\);",
    "",
    content
)

# Replace insightScore, visualDesignScore, technicalScore, storytellingScore
content = re.sub(r"const \[insightScore, setInsightScore\] = useState<number>\(23\);", "const [question1Score, setQuestion1Score] = useState<number>(23);", content)
content = re.sub(r"const \[visualDesignScore, setVisualDesignScore\] = useState<number>\(24\);", "const [question2Score, setQuestion2Score] = useState<number>(24);", content)
content = re.sub(r"const \[technicalScore, setTechnicalScore\] = useState<number>\(23\);", "const [question3Score, setQuestion3Score] = useState<number>(23);", content)
content = re.sub(r"const \[storytellingScore, setStorytellingScore\] = useState<number>\(22\);\s*", "", content)

# Replace activeJudge references
content = content.replace("activeJudge.id", "ADMIN_JUDGE.id")
content = content.replace("activeJudge.name", "ADMIN_JUDGE.name")
content = content.replace("activeJudge.role", "ADMIN_JUDGE.role")

# Replace existing load logic
load_logic_old = """    if (existing) {
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
    }"""
load_logic_new = """    if (existing) {
      setQuestion1Score(existing.question1Score);
      setQuestion2Score(existing.question2Score);
      setQuestion3Score(existing.question3Score);
      setComments(existing.comments);
      setSelectedAwards(existing.specialAwards || []);
    } else {
      setQuestion1Score(22);
      setQuestion2Score(23);
      setQuestion3Score(23);
      setComments('');
      setSelectedAwards([]);
    }"""
content = content.replace(load_logic_old, load_logic_new)

# Update totalScore
content = content.replace(
    "const totalScore = insightScore + visualDesignScore + technicalScore + storytellingScore;",
    "const totalScore = question1Score + question2Score + question3Score;"
)

# AI Assist setup
content = content.replace("setInsightScore(23);", "setQuestion1Score(23);")
content = content.replace("setVisualDesignScore(24);", "setQuestion2Score(24);")
content = content.replace("setTechnicalScore(23);", "setQuestion3Score(24);")
content = content.replace("setStorytellingScore(23);", "")

# Update payload
payload_old = """      insightScore,
      visualDesignScore,
      technicalScore,
      storytellingScore,"""
payload_new = """      question1Score,
      question2Score,
      question3Score,"""
content = content.replace(payload_old, payload_new)

# Update UI description
content = content.replace("Evaluate engineering day submissions across 4 standardized rubric categories (25 pts each, 100 max)", "Evaluate engineering day submissions across 3 standardized rubric questions (max 100).")

# Update Judge Profile Selector UI - replace with an Admin indicator
judge_selector_ui = """        {/* Judge Profile Selector */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <User className="w-4 h-4 text-indigo-400 ml-2" />
          <span className="text-xs text-slate-400 font-semibold">Active Judge:</span>
          <select
            value={ADMIN_JUDGE.id}
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
        </div>"""
new_judge_selector = """        {/* Admin Indicator */}
        <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
          <User className="w-4 h-4 text-indigo-400" />
          <span className="text-xs text-slate-400 font-semibold">Evaluator:</span>
          <span className="text-xs font-bold text-white">Administrator</span>
        </div>"""
content = content.replace(judge_selector_ui, new_judge_selector)

with open("src/components/JudgesPortal.tsx", "w") as f:
    f.write(content)

