import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Add import Team
content = content.replace("from './types';", ", Team } from './types';")
content = content.replace("import { collection, doc, onSnapshot, getDoc, setDoc } from 'firebase/firestore';", "import { collection, doc, onSnapshot, getDoc, setDoc, query, where } from 'firebase/firestore';")

# Add currentTeam state
content = content.replace("const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);", "const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);\n  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);")

# Sync team
sync_team = """  // Sync Current Team
  useEffect(() => {
    if (!currentUser) {
      setCurrentTeam(null);
      return;
    }
    
    let teamFound = false;

    // Check where creator
    const qCreator = query(collection(db, 'teams'), where('creatorId', '==', currentUser.id), where('status', '==', 'accepted'));
    const unsubCreator = onSnapshot(qCreator, (snap) => {
      if (!snap.empty) {
        setCurrentTeam({ id: snap.docs[0].id, ...snap.docs[0].data() } as Team);
        teamFound = true;
      } else if (teamFound && currentTeam?.creatorId === currentUser.id) {
        setCurrentTeam(null);
        teamFound = false;
      }
    });

    // Check where invited
    const qInvited = query(collection(db, 'teams'), where('invitedRollNo', '==', currentUser.collegeRollNo), where('status', '==', 'accepted'));
    const unsubInvited = onSnapshot(qInvited, (snap) => {
      if (!snap.empty) {
        setCurrentTeam({ id: snap.docs[0].id, ...snap.docs[0].data() } as Team);
        teamFound = true;
      } else if (teamFound && currentTeam?.invitedRollNo === currentUser.collegeRollNo) {
        setCurrentTeam(null);
        teamFound = false;
      }
    });

    return () => {
      unsubCreator();
      unsubInvited();
    };
  }, [currentUser]);

  // Sync Hackathon State"""

content = content.replace("  // Sync Hackathon State", sync_team)

# Pass to SubmissionFormModal
content = content.replace("currentUser={currentUser}", "currentUser={currentUser}\n        currentTeam={currentTeam}")

with open("src/App.tsx", "w") as f:
    f.write(content)
