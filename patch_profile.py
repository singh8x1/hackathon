import re

with open("src/components/ProfileView.tsx", "r") as f:
    content = f.read()

content = content.replace("import { AVATAR_COLORS } from '../data/mockUsers';", "import { AVATAR_COLORS } from '../data/mockUsers';\nimport { TeamManagement } from './TeamManagement';")

team_block = """
      {/* Team Management */}
      <TeamManagement currentUser={user} />

      {/* Submissions Section */}
"""

content = content.replace("      {/* Submissions Section */}", team_block)

with open("src/components/ProfileView.tsx", "w") as f:
    f.write(content)
