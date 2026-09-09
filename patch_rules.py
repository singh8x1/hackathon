import re

with open("firestore.rules", "r") as f:
    content = f.read()

teams_rules = """
    match /teams/{teamId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if request.auth != null;
    }
    match /settings/{docId}"""

content = content.replace("    match /settings/{docId}", teams_rules)

with open("firestore.rules", "w") as f:
    f.write(content)
