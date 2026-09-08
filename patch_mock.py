import re

with open("src/data/mockSubmissions.ts", "r") as f:
    content = f.read()

content = re.sub(r'insightScore: \d+,', 'question1Score: 30,', content)
content = re.sub(r'visualDesignScore: \d+,', 'question2Score: 30,', content)
content = re.sub(r'technicalScore: \d+,', 'question3Score: 32,', content)
content = re.sub(r'storytellingScore: \d+,', '', content)

with open("src/data/mockSubmissions.ts", "w") as f:
    f.write(content)
