import re

with open("src/components/JudgesPortal.tsx", "r") as f:
    content = f.read()

# Update queue
queue_repl = """                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {sub.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {sub.teamName ? `${sub.teamName}` : sub.studentName} • {sub.department}
                    </p>"""

content = re.sub(r'                    <h4 className="text-xs font-bold text-white line-clamp-1">\s+\{sub\.title\}\s+</h4>\s+<p className="text-\[11px\] text-slate-400 line-clamp-1">\s+\{sub\.studentName\} • \{sub\.department\}\s+</p>', queue_repl, content)

# Update detail header
header_repl = """                <div>
                  <span className="text-xs text-indigo-400 font-semibold">{currentSubmission.datasetTitle}</span>
                  <h3 className="text-lg font-black text-white">{currentSubmission.title}</h3>
                  <p className="text-xs text-slate-400">
                    {currentSubmission.teamName ? (
                      <>Team: <strong className="text-slate-200">{currentSubmission.teamName}</strong> ({currentSubmission.teamMembers?.join(', ')})</>
                    ) : (
                      <>Lead: <strong className="text-slate-200">{currentSubmission.studentName}</strong> ({currentSubmission.collegeRollNo})</>
                    )} • {currentSubmission.department}
                  </p>
                </div>"""

content = re.sub(r'                <div>\s+<span className="text-xs text-indigo-400 font-semibold">\{currentSubmission\.datasetTitle\}</span>\s+<h3 className="text-lg font-black text-white">\{currentSubmission\.title\}</h3>\s+<p className="text-xs text-slate-400">\s+Lead: <strong className="text-slate-200">\{currentSubmission\.studentName\}</strong> \(\{currentSubmission\.collegeRollNo\}\) • \{currentSubmission\.department\}\s+</p>\s+</div>', header_repl, content)

with open("src/components/JudgesPortal.tsx", "w") as f:
    f.write(content)

