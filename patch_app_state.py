import re

with open("src/App.tsx", "r") as f:
    content = f.read()

content = content.replace(
"""  const [hackathonState, setHackathonState] = useState<HackathonState>({
    hackathonStarted: false,
    submissionsOpen: false
  });""",
"""  const [hackathonState, setHackathonState] = useState<HackathonState>({
    hackathonStarted: true,
    submissionsOpen: true
  });"""
)

with open("src/App.tsx", "w") as f:
    f.write(content)
