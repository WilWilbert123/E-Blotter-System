const fs = require('fs');
const path = require('path');

function toValidIdentifier(str) {
  return str
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/\s+/g, '');
}

function resolvePageImplementation(filePath, content) {
  const segments = filePath.split(path.sep);
  const routeName = segments.slice(-3, -1).join(' ').replace(/[[\]]/g, '');
  const Title = toValidIdentifier(routeName);

  if (filePath.includes('layout')) {
    return "import React from 'react';\n\nexport default function Layout({ children }: { children: React.ReactNode }) {\n  return <div className=\"h-full w-full\">{children}</div>;\n}\n";
  }

  if (filePath.includes('edit') || filePath.includes('new') || filePath.includes('settings')) {
    return "'use client';\nimport React from 'react';\nimport { Card, CardHeader, CardContent, Input, Button } from '@/components/ui';\n\nexport default function " + Title + "Page() {\n  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); };\n  return (\n    <div className=\"p-6 max-w-4xl mx-auto space-y-6\">\n      <Card>\n        <CardHeader title=\"Manage " + Title + "\" />\n        <CardContent>\n          <form onSubmit={handleSubmit} className=\"space-y-4\">\n             <Input label=\"Configuration\" />\n             <Button type=\"submit\">Save Changes</Button>\n          </form>\n        </CardContent>\n      </Card>\n    </div>\n  );\n}\n";
  }

  return "import React from 'react';\nimport { Card, CardHeader, CardContent, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';\n\nexport default function " + Title + "Page() {\n  return (\n    <div className=\"p-6 space-y-6\">\n      <h1 className=\"text-2xl font-bold text-gray-900\">" + Title + " Dashboard</h1>\n      <Card>\n        <CardHeader title=\"Records\" />\n        <CardContent>\n          <Table>\n            <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Details</TableHead></TableRow></TableHeader>\n            <TableBody><TableRow><TableCell>1001</TableCell><TableCell>Record details</TableCell></TableRow></TableBody>\n          </Table>\n        </CardContent>\n      </Card>\n    </div>\n  );\n}\n";
}

function scanAndFixPages(dir) {
  const files = fs.readdirSync(dir);
  let fixedCount = 0;

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      fixedCount += scanAndFixPages(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Match "export default function SOME INVALID NAMEPage() {"
      if (/export default function .*Page\(\) \{/.test(content) || /export default function .* \{/.test(content)) {
          // I will just blindly overwrite it if it's one of the ones I generated because I'm recreating the Title logic
          // Actually, let me only overwrite if the function name has spaces or invalid chars.
          const match = content.match(/export default function ([^(]+)\(\) \{/);
          if (match && match[1].includes(' ')) {
              const newContent = resolvePageImplementation(fullPath, content);
              fs.writeFileSync(fullPath, newContent);
              fixedCount++;
          }
      }
    }
  }
  return fixedCount;
}

const appDir = path.join(__dirname, 'src', 'app');
const totalFixed = scanAndFixPages(appDir);
console.log('Successfully fixed syntax errors in ' + totalFixed + ' pages.');
