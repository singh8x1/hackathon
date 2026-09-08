const fs = require('fs');

let fileContent = fs.readFileSync('src/components/DatasetExplorer.tsx', 'utf8');

// 1. Add imports
const importsToAdd = `
  ShoppingCart,
  Music,
  MapPin,
  Film,
  Briefcase,
  Globe,
`;

fileContent = fileContent.replace(
  /import \{\s*Database,/, 
  "import {\n  Database," + importsToAdd
);

// 2. Update getIcon
fileContent = fileContent.replace(
  /case 'Zap': return Zap;[\s\S]*?case 'Activity': return Activity;/g,
  `case 'ShoppingCart': return ShoppingCart;
      case 'Music': return Music;
      case 'MapPin': return MapPin;
      case 'Film': return Film;
      case 'Briefcase': return Briefcase;
      case 'Globe': return Globe;
      case 'Sun': return Sun;`
);

// 3. Update "Grid of 5" to "Grid of 7" or remove the hardcoded grid col size since it's 5 columns it'll overflow nicely
fileContent = fileContent.replace(/lg:grid-cols-5/g, 'lg:grid-cols-4'); // Let's make it 4 columns so 7 items wrap nicely

fs.writeFileSync('src/components/DatasetExplorer.tsx', fileContent);
