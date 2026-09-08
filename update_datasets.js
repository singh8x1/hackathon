const fs = require('fs');

const fileContent = fs.readFileSync('src/data/datasets.ts', 'utf8');

// Replace the columns and sampleRows for ev-battery-specs
let updatedContent = fileContent.replace(
  /columns:\s*\[[\s\S]*?\],\s*sampleRows:\s*\[[\s\S]*?\]/g, 
  (match, offset, string) => {
    return match; // We'll do it manually. Let's just rewrite the specific blocks.
  }
);
