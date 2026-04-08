const fs = require('fs');
const path = require('path');

const files = [
  'pages/admin/AdminDashboard.jsx',
  'pages/user/BrowseWorkshops.jsx',
  'pages/admin/Materials.jsx',
  'pages/user/Dashboard.jsx',
  'pages/admin/Registrations.jsx',
  'pages/user/MyWorkshops.jsx',
  'pages/admin/Schedule.jsx',
  'pages/user/Resources.jsx',
  'pages/user/WorkshopDetail.jsx'
];

for (const f of files) {
  const file = path.join(__dirname, 'src', f);
  if (!fs.existsSync(file)) continue;
  
  let c = fs.readFileSync(file, 'utf8');
  
  // Case 1: import { workshops, CATEGORIES, STATUSES } from "../../data/workshops"
  c = c.replace(/import\s*\{\s*workshops\s*,\s*(.*?)\s*\}\s*from\s*\"(.*?)data\/workshops\";/, 'import { $1 } from \"$2data/workshops\";\nimport { useApp } from \"$2context/AppContext\";');
  
  // Case 2: import { CATEGORIES, workshops } from "../../data/workshops" 
  c = c.replace(/import\s*\{\s*(.*?)\s*,\s*workshops\s*\}\s*from\s*\"(.*?)data\/workshops\";/, 'import { $1 } from \"$2data/workshops\";\nimport { useApp } from \"$2context/AppContext\";');

  // Case 3: import { workshops } from "../../data/workshops"
  c = c.replace(/import\s*\{\s*workshops\s*\}\s*from\s*\"(.*?)data\/workshops\";/g, 'import { useApp } from \"$1context/AppContext\";');

  // Inject useApp call into the component
  c = c.replace(/export default function (\w+)\((.*?)\)\s*\{/, (match) => {
    return match + '\n  const { workshops } = useApp();';
  });

  // If there's already a useApp call, just add workshops to it
  c = c.replace(/(const\s*\{\s*[^}]*)(\}\s*=\s*useApp\(\);)/, (match, p1, p2) => {
    // Only add if not already there
    if (!p1.includes('workshops')) {
      return p1 + ', workshops ' + p2;
    }
    return match;
  });

  // Since we might have added `const { workshops } = useApp();` directly and also there was a `const { currentUser } = useApp();`
  // We should clean that up or make sure it compiles. React allows two useApp() calls in the same component.
  // Wait, if it has 2 `useApp()` calls, it might cause `import { useApp }` to be undefined if we didn't import it properly.
  // Let's just make sure `useApp` is imported if not present.
  if (c.includes('useApp()') && !c.includes('import { useApp }')) {
     c = 'import { useApp } from "../../context/AppContext";\n' + c;
  }

  // Remove duplicate useApp imports
  const lines = c.split('\n');
  const uniqueLines = [];
  const imports = new Set();
  
  lines.forEach(line => {
      if (line.includes('import { useApp }')) {
          if (!imports.has('useApp')) {
              imports.add('useApp');
              uniqueLines.push(line);
          }
      } else {
          uniqueLines.push(line);
      }
  });
  c = uniqueLines.join('\n');

  fs.writeFileSync(file, c);
}
console.log('Done refactoring');
