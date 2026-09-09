import re

with open("src/components/GalleryView.tsx", "r") as f:
    content = f.read()

# Update search query
search_repl = """      return sub.title.toLowerCase().includes(q) || 
             sub.studentName.toLowerCase().includes(q) || 
             (sub.teamName && sub.teamName.toLowerCase().includes(q)) || 
             (sub.teamMembers && sub.teamMembers.some(m => m.toLowerCase().includes(q))) ||
             sub.department.toLowerCase().includes(q);"""

content = re.sub(r'      return sub\.title\.toLowerCase\(\)\.includes\(q\) \|\|\s+sub\.studentName\.toLowerCase\(\)\.includes\(q\) \|\|\s+sub\.department\.toLowerCase\(\)\.includes\(q\);', search_repl, content)

# Update participant info
participant_repl = """                <div>
                  {sub.teamName ? (
                    <div className="font-semibold text-slate-200 text-xs">
                      {sub.teamName} <span className="text-[9px] bg-indigo-500/20 text-indigo-300 px-1 py-0.5 rounded ml-0.5 uppercase">Team</span>
                    </div>
                  ) : (
                    <div className="font-semibold text-slate-200 text-xs">{sub.studentName}</div>
                  )}
                  <div className="text-[11px] text-slate-400">{sub.department}</div>
                </div>"""

content = re.sub(r'                <div>\s+<div className="font-semibold text-slate-200 text-xs">\{sub\.studentName\}</div>\s+<div className="text-\[11px\] text-slate-400">\{sub\.department\}</div>\s+</div>', participant_repl, content)

with open("src/components/GalleryView.tsx", "w") as f:
    f.write(content)

