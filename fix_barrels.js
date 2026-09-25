const fs = require('fs');
const path = require('path');

function generateBarrelExports(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      generateBarrelExports(fullPath);
      
      const indexPath = path.join(fullPath, 'index.ts');
      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, 'utf8');
        if (content.includes('// TODO: Implement') || content.trim() === '') {
          const siblingFiles = fs.readdirSync(fullPath).filter(f => 
            (f.endsWith('.ts') || f.endsWith('.tsx')) && f !== 'index.ts'
          );
          
          let exportContent = '';
          for (const sibling of siblingFiles) {
            const basename = path.basename(sibling, path.extname(sibling));
            exportContent += "export * from './" + basename + "';\n";
          }
          
          if (exportContent) {
            fs.writeFileSync(indexPath, exportContent);
          } else {
             fs.writeFileSync(indexPath, 'export {};\n');
          }
        }
      }
    }
  }
}

generateBarrelExports(path.join(__dirname, 'src', 'components'));
generateBarrelExports(path.join(__dirname, 'src', 'features'));
generateBarrelExports(path.join(__dirname, 'src', 'lib'));
console.log('Fixed all index.ts barrel exports.');
