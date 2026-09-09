import re

with open("src/components/SubmissionFormModal.tsx", "r") as f:
    content = f.read()

# Add currentTeam to props
content = content.replace("import { Submission, TrackType, PythonLibrary, InteractiveTool, UserProfile } from '../types';", "import { Submission, TrackType, PythonLibrary, InteractiveTool, UserProfile, Team } from '../types';")
content = content.replace("currentUser?: UserProfile | null;", "currentUser?: UserProfile | null;\n  currentTeam?: Team | null;")
content = content.replace("  currentUser\n}) => {", "  currentUser,\n  currentTeam\n}) => {")

# Modify TeamMembers logic inside useEffect
content = content.replace(
"""  const [teamMembersInput, setTeamMembersInput] = useState('');""",
"""  const [teamMembersInput, setTeamMembersInput] = useState('');
  const [teamId, setTeamId] = useState<string | undefined>(undefined);
  const [teamName, setTeamName] = useState<string | undefined>(undefined);"""
)

useEffect_repl = """  React.useEffect(() => {
    if (currentUser) {
      setStudentName(currentUser.name);
      setCollegeRollNo(currentUser.collegeRollNo);
      setDepartment(currentUser.department);
      setYearOfStudy(currentUser.yearOfStudy);
    }
    
    if (currentTeam) {
      const isCreator = currentTeam.creatorId === currentUser?.id;
      const tName = currentTeam.name || `${currentTeam.creatorName} & ${currentTeam.invitedName || 'Partner'}`;
      const partner = isCreator ? (currentTeam.invitedName || currentTeam.invitedRollNo) : currentTeam.creatorName;
      setTeamMembersInput(`${currentUser?.name}, ${partner}`);
      setTeamName(tName);
      setTeamId(currentTeam.id);
    } else {
      setTeamMembersInput(currentUser?.name || '');
      setTeamName(undefined);
      setTeamId(undefined);
    }
  }, [currentUser, currentTeam, isOpen]);"""

content = re.sub(r'  // Sync with currentUser when modal opens or user switches\s+React\.useEffect\(\(\) => \{\s+if \(currentUser\) \{\s+setStudentName\(currentUser\.name\);\s+setCollegeRollNo\(currentUser\.collegeRollNo\);\s+setDepartment\(currentUser\.department\);\s+setYearOfStudy\(currentUser\.yearOfStudy\);\s+\}\s+\}, \[currentUser, isOpen\]\);', useEffect_repl, content)

# Include teamId and teamName in newSubmission
content = content.replace(
"""      title: title.trim(),
      studentName: studentName.trim(),
      teamMembers: teamMembersInput.trim() 
        ? teamMembersInput.split(',').map(m => m.trim()).filter(Boolean)
        : [studentName.trim()],""",
"""      title: title.trim(),
      studentName: studentName.trim(),
      teamId: teamId,
      teamName: teamName,
      teamMembers: teamMembersInput.trim() 
        ? teamMembersInput.split(',').map(m => m.trim()).filter(Boolean)
        : [studentName.trim()],"""
)

# Render team info in UI instead of showing Verified Participant alone
ui_repl = """            {currentUser && currentTeam ? (
              <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Submitting as Team <strong>{teamName}</strong> ({teamMembersInput})</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Linked to Profile</span>
              </div>
            ) : currentUser ? (
              <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Submitting as verified participant: <strong>{currentUser.name}</strong> ({currentUser.collegeRollNo})</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Linked to Profile</span>
              </div>
            ) : null}"""

content = re.sub(r'            \{currentUser && \(\s+<div className="p-2\.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-300 flex items-center justify-between">\s+<div className="flex items-center gap-2">\s+<span className="w-2 h-2 rounded-full bg-emerald-400" />\s+<span>Submitting as verified participant: <strong>\{currentUser\.name\}</strong> \(\{currentUser\.collegeRollNo\}\)</span>\s+</div>\s+<span className="text-\[10px\] text-slate-400 font-mono">Linked to Profile</span>\s+</div>\s+\)\}', ui_repl, content)

with open("src/components/SubmissionFormModal.tsx", "w") as f:
    f.write(content)

