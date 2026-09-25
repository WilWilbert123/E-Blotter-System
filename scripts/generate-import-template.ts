import fs from 'fs';
import path from 'path';

const headers = [
  'username',
  'email',
  'firstName',
  'lastName',
  'roleId',
  'barangayId'
];

const sampleData = [
  'jperez,juan@example.com,Juan,Perez,BARANGAY_CAPTAIN,1',
  'mdelacruz,maria@example.com,Maria,Dela Cruz,BARANGAY_STAFF,1'
];

const csvContent = headers.join(',') + '\n' + sampleData.join('\n');
const outPath = path.join(process.cwd(), 'public', 'user_import_template.csv');

fs.writeFileSync(outPath, csvContent);
console.log(`✅ Generated CSV template at: ${outPath}`);
