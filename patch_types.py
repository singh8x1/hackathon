import re

with open("src/types.ts", "r") as f:
    content = f.read()

# Add Team interface
team_interface = """export interface Team {
  id: string;
  name?: string;
  creatorId: string;
  creatorRollNo: string;
  creatorName: string;
  invitedRollNo: string;
  invitedId?: string;
  invitedName?: string;
  status: 'pending' | 'accepted';
  createdAt: string;
}

export interface PrizeItem"""

content = content.replace("export interface PrizeItem", team_interface)

# Add teamName and teamId to Submission
sub_replace = """  studentName: string;
  teamId?: string;
  teamName?: string;
  teamMembers?: string[];
"""
content = content.replace("  studentName: string;\n  teamMembers?: string[];\n", sub_replace)

with open("src/types.ts", "w") as f:
    f.write(content)
