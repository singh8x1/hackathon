import re

with open("src/components/JudgesPortal.tsx", "r") as f:
    content = f.read()

# Replace the beginning of the return statement
new_return = """  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <BarChart3 className="w-12 h-12 mb-4 text-slate-600" />
        <h2 className="text-xl font-bold text-white mb-2">No Submissions Yet</h2>
        <p>Waiting for students to submit their projects.</p>
      </div>
    );
  }

  return ("""

content = content.replace("  return (\n    <div className=\"space-y-8\">", new_return + "\n    <div className=\"space-y-8\">")

with open("src/components/JudgesPortal.tsx", "w") as f:
    f.write(content)
