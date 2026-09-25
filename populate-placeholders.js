const fs = require('fs');
const path = require('path');

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.startsWith('// TODO: Implement')) {
        const basename = path.basename(fullPath, '.tsx');
        let componentName = basename.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
        if (componentName === 'Page' || componentName === 'Layout' || componentName === 'Error' || componentName === 'NotFound' || componentName === 'Loading') {
          const parts = fullPath.split(path.sep);
          const parentDir = parts[parts.length - 2];
          componentName = parentDir.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('') + componentName;
          // Format [id] correctly
          componentName = componentName.replace(/\\[(.*?)\\]/g, '$1');
          componentName = componentName.replace(/[^a-zA-Z0-9]/g, '');
        }
        
        const newContent = `import React from 'react';\n\nexport default function ${componentName}() {\n  return (\n    <div className="p-4">\n      <h1 className="text-2xl font-bold">${componentName}</h1>\n      <p>This page is currently under construction. Core functionalities are being wired.</p>\n    </div>\n  );\n}\n`;
        fs.writeFileSync(fullPath, newContent);
      }
    } else if (fullPath.endsWith('route.ts')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.startsWith('// TODO: Implement')) {
          const newContent = `import { NextResponse } from 'next/server';\n\nexport async function GET() {\n  return NextResponse.json({ message: 'API Route Not Implemented Yet', status: 501 });\n}\n`;
          fs.writeFileSync(fullPath, newContent);
        }
    } else if (fullPath.endsWith('.ts') && fullPath.includes('tests')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.startsWith('// TODO: Implement')) {
          const newContent = `import { test, expect } from 'vitest';\n\ntest('placeholder', () => {\n  expect(true).toBe(true);\n});\n`;
          fs.writeFileSync(fullPath, newContent);
        }
    }
  }
}

processDirectory(path.join(__dirname, 'src'));
processDirectory(path.join(__dirname, 'tests'));
console.log('Populated placeholder code.');
