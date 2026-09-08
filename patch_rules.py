import re

with open("firestore.rules", "r") as f:
    content = f.read()

# Make submissions readable by everyone, creatable by everyone, updateable by admin or owner
# Actually, the easiest is to allow create: if true;
content = content.replace("allow create: if request.auth != null;", "allow create: if true;")

with open("firestore.rules", "w") as f:
    f.write(content)
