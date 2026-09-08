import re

with open("src/components/JudgesPortal.tsx", "r") as f:
    content = f.read()

# Replace the 4 slider sections with 3 new ones.
# We'll use regex to match from "1. Insight Depth" all the way to the end of the "4. Storytelling" section
slider_sections_regex = r"\{/\* 1\. Insight Depth \*/\}.*?\{/\* 4\. Storytelling & Clarity \*/\}.*?</div>\s*</div>"

replacement = """{/* 1. Data Accuracy & Engineering Complexity */}
                <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white">
                        1. Data Accuracy &amp; Engineering Complexity
                      </span>
                      <p className="text-[11px] text-slate-400">
                        Statistical depth, novelty of engineering insights, answering dataset core challenges.
                      </p>
                    </div>
                    <span className="text-sm font-black text-indigo-400 font-mono px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-500/30">
                      {question1Score} / 33
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={33}
                    value={question1Score}
                    onChange={(e) => setQuestion1Score(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0 (Shallow)</span>
                    <span>16 (Average)</span>
                    <span>24 (Proficient)</span>
                    <span>33 (Publication Quality)</span>
                  </div>
                </div>

                {/* 2. Visual Design & Interactivity */}
                <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white">
                        2. Visual Design &amp; Interactivity
                      </span>
                      <p className="text-[11px] text-slate-400">
                        Color harmony, typography, aspect ratio, clean legends, and interactive elements.
                      </p>
                    </div>
                    <span className="text-sm font-black text-purple-400 font-mono px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30">
                      {question2Score} / 33
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={33}
                    value={question2Score}
                    onChange={(e) => setQuestion2Score(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0 (Unstyled)</span>
                    <span>16 (Basic Plot)</span>
                    <span>24 (Polished)</span>
                    <span>33 (Masterpiece)</span>
                  </div>
                </div>

                {/* 3. Analytical Insights & Storytelling */}
                <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white">
                        3. Analytical Insights &amp; Storytelling
                      </span>
                      <p className="text-[11px] text-slate-400">
                        Explaining takeaways clearly, actionable engineering relevance, and impact.
                      </p>
                    </div>
                    <span className="text-sm font-black text-emerald-400 font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                      {question3Score} / 34
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={34}
                    value={question3Score}
                    onChange={(e) => setQuestion3Score(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0 (Unclear)</span>
                    <span>16 (Understood)</span>
                    <span>25 (Compelling)</span>
                    <span>34 (Executive Story)</span>
                  </div>
                </div>"""

content = re.sub(slider_sections_regex, replacement, content, flags=re.DOTALL)

# Let's fix the remaining `insightScore` usages (like in AI suggest or state).
content = content.replace("insightScore", "question1Score")
content = content.replace("visualDesignScore", "question2Score")
content = content.replace("technicalScore", "question3Score")
content = content.replace("storytellingScore", "question3Score")

with open("src/components/JudgesPortal.tsx", "w") as f:
    f.write(content)

