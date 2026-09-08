import re

with open("src/App.tsx", "r") as f:
    content = f.read()

replacement = """  // Sync Hackathon State
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'global'), (docSnap) => {
      if (docSnap.exists()) {
        setHackathonState(docSnap.data() as HackathonState);
      }
    });
    return () => unsubscribe();
  }, []);"""

# The regex matches the block we added before
content = re.sub(
    r"  // Sync Hackathon State\s+useEffect\(\(\) => \{\s+const unsubscribe = onSnapshot\(doc\(db, 'settings', 'global'\), async \(docSnap\) => \{\s+if \(docSnap\.exists\(\)\) \{\s+setHackathonState\(docSnap\.data\(\) as HackathonState\);\s+\} else \{\s+// Create the global settings doc by default\s+try \{\s+await setDoc\(doc\(db, 'settings', 'global'\), \{\s+hackathonStarted: true,\s+submissionsOpen: true\s+\}\);\s+\} catch \(e\) \{\s+console\.error\(\"Could not init settings:\", e\);\s+\}\s+\}\s+\}\);\s+return \(\) => unsubscribe\(\);\s+\}, \[\]\);",
    replacement,
    content
)

with open("src/App.tsx", "w") as f:
    f.write(content)
