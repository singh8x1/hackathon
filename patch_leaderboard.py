import re

with open("src/components/LeaderboardView.tsx", "r") as f:
    content = f.read()

# Update search query
search_repl = """          const matchTitle = sub.title.toLowerCase().includes(q);
          const matchStudent = sub.studentName.toLowerCase().includes(q) || (sub.teamMembers && sub.teamMembers.some(m => m.toLowerCase().includes(q))) || (sub.teamName && sub.teamName.toLowerCase().includes(q));
          const matchRoll = sub.collegeRollNo.toLowerCase().includes(q);
          const matchDept = sub.department.toLowerCase().includes(q);"""

content = re.sub(r'          const matchTitle = sub\.title\.toLowerCase\(\)\.includes\(q\);\s+const matchStudent = sub\.studentName\.toLowerCase\(\)\.includes\(q\);\s+const matchRoll = sub\.collegeRollNo\.toLowerCase\(\)\.includes\(q\);\s+const matchDept = sub\.department\.toLowerCase\(\)\.includes\(q\);', search_repl, content)

# Update participant column
# from sub.studentName to sub.teamName || sub.studentName
participant_repl = """                      <td className="py-4 px-4">
                        <div className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {sub.teamName ? (
                            <span className="flex flex-col">
                              <span>{sub.teamName} <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded ml-1">TEAM</span></span>
                              <span className="text-xs text-slate-400 font-normal mt-0.5">{sub.teamMembers?.join(' & ')}</span>
                            </span>
                          ) : (
                            sub.studentName
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1">
                          {sub.department} • <span className="font-mono">{sub.yearOfStudy}</span>
                        </div>
                        {(!sub.teamName) && (
                          <div className="text-[10px] font-mono text-slate-500">
                            {sub.collegeRollNo}
                          </div>
                        )}
                      </td>"""

content = re.sub(r'                      <td className="py-4 px-4">\s+<div className="font-bold text-white group-hover:text-indigo-300 transition-colors">\s+\{sub\.studentName\}\s+</div>\s+<div className="text-\[11px\] text-slate-400">\s+\{sub\.department\} • <span className="font-mono">\{sub\.yearOfStudy\}</span>\s+</div>\s+<div className="text-\[10px\] font-mono text-slate-500">\s+\{sub\.collegeRollNo\}\s+</div>\s+</td>', participant_repl, content)

with open("src/components/LeaderboardView.tsx", "w") as f:
    f.write(content)

