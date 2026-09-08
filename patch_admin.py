import re

with open("src/components/AdminPortal.tsx", "r") as f:
    content = f.read()

content = content.replace("import { doc, updateDoc }", "import { doc, setDoc }")
content = content.replace("await updateDoc(doc(db, 'settings', 'global'), {", "await setDoc(doc(db, 'settings', 'global'), {")
content = content.replace("hackathonStarted: !hackathonState.hackathonStarted\n      });", "hackathonStarted: !hackathonState.hackathonStarted\n      }, { merge: true });")
content = content.replace("submissionsOpen: !hackathonState.submissionsOpen\n      });", "submissionsOpen: !hackathonState.submissionsOpen\n      }, { merge: true });")

with open("src/components/AdminPortal.tsx", "w") as f:
    f.write(content)
