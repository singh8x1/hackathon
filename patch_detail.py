import re

with open("src/components/SubmissionDetailModal.tsx", "r") as f:
    content = f.read()

participant_repl = """                  <div className="space-y-1 text-xs text-slate-300">
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
                  </div>"""

content = re.sub(r'                  <div className="space-y-1 text-xs text-slate-300">\s+<div className="flex justify-between">\s+<span className="text-slate-500">Lead Author:</span>\s+<span className="font-bold text-white">\{submission\.studentName\}</span>\s+</div>\s+<div className="flex justify-between">\s+<span className="text-slate-500">Department:</span>\s+<span>\{submission\.department\}</span>\s+</div>\s+<div className="flex justify-between">\s+<span className="text-slate-500">Year / Roll No:</span>\s+<span className="font-mono">\{submission\.yearOfStudy\} • \{submission\.collegeRollNo\}</span>\s+</div>\s+\{submission\.teamMembers && submission\.teamMembers\.length > 1 && \(\s+<div className="pt-1 border-t border-slate-800/60 flex justify-between">\s+<span className="text-slate-500">Team Members:</span>\s+<span className="text-right">\{submission\.teamMembers\.join\(\', \'\)\}</span>\s+</div>\s+\)\}\s+</div>', participant_repl, content)

with open("src/components/SubmissionDetailModal.tsx", "w") as f:
    f.write(content)
