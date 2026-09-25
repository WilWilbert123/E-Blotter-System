const fs = require('fs');
const path = require('path');

function cleanLiteralNewlines(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !fullPath.includes('node_modules') && !fullPath.includes('.git') && !fullPath.includes('.next')) {
      cleanLiteralNewlines(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.endsWith('\\n')) {
        // Remove the literal \n at the end and replace it with a real newline
        content = content.slice(0, -2) + '\n';
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

cleanLiteralNewlines(path.join(__dirname, 'src'));
console.log('Cleaned up literal \\n characters.');
