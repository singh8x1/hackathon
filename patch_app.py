import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Add a fallback to create the global settings doc if it doesn't exist
replacement = """  // Sync Hackathon State
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'global'), async (docSnap) => {
      if (docSnap.exists()) {
        setHackathonState(docSnap.data() as HackathonState);
      } else {
        // Create the global settings doc by default
        try {
          await setDoc(doc(db, 'settings', 'global'), {
            hackathonStarted: true,
            submissionsOpen: true
          });
        } catch (e) {
          console.error("Could not init settings:", e);
        }
      }
    });
    return () => unsubscribe();
  }, []);"""

content = re.sub(r'  // Sync Hackathon State\s+useEffect\(\(\) => \{\s+const unsubscribe = onSnapshot\(doc\(db, \'settings\', \'global\'\), \(docSnap\) => \{\s+if \(docSnap\.exists\(\)\) \{\s+setHackathonState\(docSnap\.data\(\) as HackathonState\);\s+\}\s+\}\);\s+return \(\) => unsubscribe\(\);\s+\}, \[\]\);', replacement, content)

with open("src/App.tsx", "w") as f:
    f.write(content)
